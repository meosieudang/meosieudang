const router = require("express").Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const Plates = require("../../models/Plates");
const validateProfile = require("../../validation/profile");
const validateLicensePlates = require("../../validation/licensePlates");

// @route get api/profiles/
// @desc  get all project
// @access Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find()
      .sort({ create_date: 1 })
      .populate("profile", ["licensePlates"])
      .then(profiles => {
        if (!profiles)
          return res.status(404).json({ msg: "Not Found Project" });

        res.json(profiles);
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
      .populate("profile", ["licensePlates", "start", "end", "price"])
      .then(profile => res.json(profile));
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
    if (req.body.handle) profileField.handle = req.body.handle;
    if (req.body.create_date) profileField.create_date = req.body.create_date;

    //Check create_date exist
    Profile.findOne({ create_date: profileField.create_date }).then(profile => {
      if (profile) {
        res.status(400).json({ create_date: "That Date already exists." });
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
      .populate("profile", ["licensePlates", "start", "end", "price"])
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
    Plates.find({ profile: req.params.id }).then(plates => {
      if (!plates) return res.status(404).json({ msg: "not found plates" });

      Plates.deleteMany({ profile: req.params.id }).then(plates => {
        Profile.findByIdAndDelete(req.params.id).then(profile => {
          res.json({ msg: "success" });
        });
      });
    });
  }
);

module.exports = router;
