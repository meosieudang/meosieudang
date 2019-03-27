const router = require("express").Router();
const Profile = require("../../models/Profile");
const passport = require("passport");
const validateProfile = require("../../validation/profile");

// @route post api/profiles/add
// @desc  add profile
// @access Public
router.post("/add", (req, res) => {
  Profile.findOne({ handle: req.body.handle }).then(profile => {
    if (profile) {
      res.status(400).json({ email: "Email already exists." });
    } else {
      console.log("create");
      // create new user
      const newProfile = new Profile({
        handle: req.body.handle,
        create_date: req.body.create_date
      });
      console.log(newProfile);
      newProfile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.json(err));
    }
  });
});
// router.post(
//   "/add",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const newProfile = {};
//     if (req.body.handle) newProfile.handle = req.body.handle;
//     if (req.body.create_date) newProfile.create_date = req.body.create_date;

//     Profile.findOne({ create_date: req.body.create_date }).then(udemy => {
//       console.log(udemy);
//       if (udemy) {
//         res.status(404).json({ create_dateerr: "profile exist" });
//       }
//       //create new profile
//       new Profile(newProfile)
//         .save()
//         .then(udemy => res.json(udemy))
//         .catch(err => res.status(404).json(err));
//     });
//   }
// );

// newProfile.user = req.user.id;
// if (req.body.handle) newProfile.handle = req.body.handle;
// if (req.body.create_date) newProfile.create_date = req.body.create_date;

// Profile.findOne({ user: req.user.id }).then(profile => {
//   if (profile) {
//     //update
//     Profile.findOneAndUpdate(
//       { user: req.user.id },
//       { $set: newProfile },
//       { new: true }
//     ).then(profile => res.json(profile));
//   } else {
//     //create

// @route post api/profiles/add-profile
// @desc  add list profile
// @access Public
router.post(
  "/add-profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newProfile = {
        name: req.body.name
      };

      const seat = profile.profile.find(item => item.name === req.body.name);
      if (seat) {
        res.status(400).json({ msg: "Name Car already exist" });
      }

      profile.profile.unshift(newProfile);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route post api/profiles/add-seat
// @desc  add list seat
// @access Public
router.post(
  "/add-seat/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newSeat = {
        nameSeat: req.body.nameSeat,
        nameUser: req.body.nameUser,
        phoneUser: req.body.phoneUser
      };

      const seat = profile.profile.find(item => item.id === req.params.id);
      if (seat.nameSeat === req.body.nameSeat)
        res.status(400).json({ msg: "Name Seat already exists" });

      seat.seat.pop(newSeat);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route post api/profiles/edit-profile
// @desc  edit profile
// @access Public
// router.post(
//   "/edit-seat/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     console.log(res);
//   }
// );

// @route get api/profiles/
// @desc  get all profile
// @access Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find().then(profiles => res.json(profiles));
  }
);

// @route get api/profiles/:id
// @desc  get  profile
// @access Public
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findById(req.params.id).then(profile => {
      if (!profile) res.status(404).json({ msg: "Not found Profile" });

      res.json(profile);
    });
  }
);

// @route get api/profiles/
// @desc  get profile detail
// @access Public
router.get(
  "/detail/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const seat = profile.profile.find(item => item.id === req.params.id);

      res.json(seat);
    });
  }
);

module.exports = router;
