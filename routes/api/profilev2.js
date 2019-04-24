const router = require("express").Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const Plates = require("../../models/Plates");
const Promise = require("bluebird");
const validateProfile = require("../../validation/profile");
const validateLicensePlates = require("../../validation/licensePlates");

// @route search api/profiles/
// @desc  get 1 project
// @access Public
router.get(
  "/search",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ create_date: req.query.date })
      .populate("profile")
      .then(profile => {
        if (!profile) return res.status(404).json({ msg: "Không tìm thấy" });
        res.json(profile);
      })
      .catch(() => res.status(404).json({ msg: "not found" }));
  }
);

// @route get api/profiles/
// @desc  get all project
// @access Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { page, limit } = req.query;

    const options = {
      sort: { dateAt: -1 },
      select: ["create_date", "dateAt"],
      populate: { path: "profile", select: ["seat", "price"] },
      page: parseInt(page),
      limit: parseInt(limit) || 10
    };
    Profile.paginate({}, options).then(profile => {
      const newProfile = {
        docs: profile.docs,
        totalDocs: profile.totalDocs,
        limit: profile.limit
      };
      if (newProfile.docs.length === 0)
        return res.status(404).json({ msg: "Data empty" });
      res.json(newProfile);
    });
  }
);

// @route get api/profiles/:id
// @desc  get 1 project
// @access Public
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findById(req.params.id)
      .populate("profile")
      .then(profile => {
        res.json(profile);
      })
      .catch(() => res.status(404).json({ msg: "not found" }));
  }
);

// @route post api/profiles/
// @desc  add project
// @access Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfile(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Get field
    const profileField = {};
    profileField.user = req.user.id;
    if (req.body.create_date) profileField.create_date = req.body.create_date;

    //Check create_date exist
    Profile.findOne({ create_date: req.body.create_date }).then(profile => {
      if (profile) {
        res.status(400).json({ create_date: "Ngày khởi hành đã tồn tại" });
      } else {
        // create new user
        new Profile(profileField)
          .save()
          .then(profile => res.json(profile))
          .catch(err => console.log(err));
      }
    });
  }
);

// @route post api/profiles/:id
// @desc  add  plates
// @access Public
router.post(
  "/:idProfile/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findById(req.params.idProfile)
      .populate("profile")
      .then(profile => {
        if (!profile) return res.status(404).json({ msg: "not found profile" });

        const findPlates = profile.profile.find(
          item => item.licensePlates === req.body.licensePlates
        );

        if (findPlates)
          return res
            .status(400)
            .json({ licensePlates: "Biển số xe đã tồn tại" });

        const { errors, isValid } = validateLicensePlates(req.body);

        //check validation
        if (!isValid) {
          return res.status(400).json(errors);
        }

        const newPlates = new Plates({
          start: req.body.start,
          end: req.body.end,
          licensePlates: req.body.licensePlates,
          price: req.body.price
        });

        newPlates.save();
        profile.profile.push(newPlates);

        newPlates.profile = profile;

        profile.save().then(profile => res.json(profile));
      });
  }
);

// @route delete /api/profiles/:id
// @desc  delete project
// @access Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Promise.all([
      Plates.deleteMany({ profile: req.params.id }).exec(),
      Profile.findByIdAndDelete(req.params.id).exec()
    ]).then(() => {
      res.json({ msg: "success" });
    });
  }
);

module.exports = router;
