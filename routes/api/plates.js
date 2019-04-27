const router = require("express").Router();
const passport = require("passport");
const Promise = require("bluebird");
const Plates = require("../../models/Plates");
const Profile = require("../../models/Profile");
const validateLicensePlates = require("../../validation/licensePlates");
const validateCreateListSeat = require("../../validation/createListSeat");

// @route get api/profiles/
// @desc  get  plates
// @access Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Plates.find()
      .populate("profile", ["create_date"])
      .then(seats => res.json(seats));
  }
);

// @route get api/plates/:idPlates
// @desc  get 1 plates
// @access Public
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Plates.findById(req.params.id)
      .populate("profile", ["create_date"])
      .then(plates => res.json(plates));
  }
);

// @route post api/plates/:idPlates/update-seat
// @desc  FIND AND ADD MULTI SEAT {"data" : ['a', 'b', 'c']}
// @access Public
router.post(
  "/update-multi",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { data, nameUser, phoneUser } = req.body;
    data.map(item => {
      Plates.updateOne(
        { "seat._id": item },
        {
          "seat.$.nameUser": nameUser,
          "seat.$.phoneUser": phoneUser,
          "seat.$.isBook": phoneUser ? true : false
        },
        { new: true }
      ).then(() => res.json({ msg: "Thêm thành công" }));
    });
  }
);

// @route post api/plates/:idPlates/
// @desc  create list seat in profile
// @access Public
router.post(
  "/:idPlates",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Plates.findById(req.params.idPlates)
      .populate("profile", ["create_date"])
      .then(profile => {
        if (!profile) return res.status(404).json({ msg: "not found profile" });

        const { errors, isValid } = validateCreateListSeat(req.body);

        //check validation
        if (!isValid) {
          return res.status(400).json(errors);
        }

        //them ghe
        const numberSeat = req.body.numberSeat;

        const findNameSeat = profile.seat.find(item => item.nameSeat === "A1");

        for (let i = 0; i < numberSeat; i++) {
          if (findNameSeat) {
            res.status(400).json({ msg: "Name Seat already exists" });
            break;
          }
          profile.seat.push({
            nameSeat: `A` + parseInt(i + 1)
          });
        }
        for (let i = 0; i < numberSeat; i++) {
          if (findNameSeat) {
            res.status(400).json({ msg: "Name Seat already exists" });
            break;
          }
          profile.seat.push({
            nameSeat: `B` + parseInt(i + 1)
          });
        }
        profile.save().then(profile => res.json(profile));
      });
  }
);

// @route PUT api/plates/:idPlates/update-plates
// @desc  UPDATE LINCENSE PLATES
// @access Public
router.put(
  "/:idPlates/update-plates",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateLicensePlates(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Promise.all([
      Plates.findByIdAndUpdate(
        req.params.idPlates,
        {
          start: req.body.start,
          end: req.body.end,
          price: req.body.price
        },
        { new: true }
      ).exec(),
      Profile.findOne({ profile: req.params.idPlates })
        .populate("profile")
        .exec()
    ]).spread((val1, val2) => res.json(val2));
  }
);

// @route post api/plates/:idPlates/
// @desc  DELETE list seat in profile
// @access Public
router.put(
  "/delete-list-seat",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Plates.findById(req.body.idPlates)
      .populate("profile", ["create_date"])
      .then(plates => {
        if (!plates) return res.status(404).json({ msg: "not found plates" });

        plates.seat = [];
        plates.save().then(plates => res.json(plates));
      });
  }
);

// @route DELETE api/plates/:idPlates/delete-plates
// @desc  DELETE LINCENSE PLATES
// @access Public
router.delete(
  "/:idPlates/delete-plates",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Plates.findByIdAndDelete(req.params.idPlates).then(plates => {
      Profile.findById(plates.profile._id)
        .populate("profile")
        .then(profile => {
          res.json(profile);
        });
    });
  }
);

// @route post api/plates/
// @desc   UPDATE USER
// @access Public
router.put(
  "/:idSeat",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Plates.findOneAndUpdate(
      { "seat._id": req.params.idSeat },
      {
        "seat.$.nameUser": req.body.nameUser,
        "seat.$.phoneUser": req.body.phoneUser,
        "seat.$.isBook": req.body.phoneUser ? true : false
      },
      { new: true }
    )
      .populate("profile", ["create_date"])
      .then(seat => {
        if (seat === null)
          return res.status(404).json({ msg: "Not found seat" });
        res.json(seat);
      });
  }
);

// @route DELETE api/plates/:idSeat/delete-seat
// @desc  DELETE 1 SEAT
// @access Public
router.put(
  "/:idSeat/delete-seat",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Plates.findOneAndUpdate(
      { "seat._id": req.params.idSeat },
      {
        "seat.$.nameUser": "",
        "seat.$.phoneUser": "",
        "seat.$.isBook": req.body.phoneUser ? true : false
      },
      { new: true }
    )
      .populate("profile", ["create_date"])
      .then(seat => {
        res.json(seat);
      });
  }
);

// @route put api/plates/:idSeat1/:idSeat2
// @desc  find and move object SWAP SEAT
// @access Public
router.put(
  "/:idSeat/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Plates.findOne({ "seat._id": req.params.idSeat }).then(seat => {
      if (!seat) return res.status(404).json({ mgs: "not found 1" });

      //tim doi tuong thay doi
      const findSeat1 = seat.seat.find(item => item.id === req.params.idSeat);

      //tim doi tuong can thay doi
      const findSeat2 = seat.seat.find(item => item.id === req.params.id);

      const dataSeat2 = findSeat2;

      // tim seat2 va update
      Plates.findOneAndUpdate(
        { "seat._id": req.params.id },
        {
          "seat.$.nameUser": findSeat1.nameUser,
          "seat.$.phoneUser": findSeat1.phoneUser,
          "seat.$.isBook": findSeat1.phoneUser ? true : false
        },
        { new: true }
      ).then(seatNew => {
        if (!seatNew) return res.status(404).json({ msg: "not found 2" });

        Plates.findOneAndUpdate(
          { "seat._id": req.params.idSeat },
          {
            "seat.$.nameUser": dataSeat2.nameUser,
            "seat.$.phoneUser": dataSeat2.phoneUser,
            "seat.$.isBook": dataSeat2.phoneUser ? true : false
          },
          { new: true }
        )
          .populate("profile")
          .then(seatOld => res.json(seatOld));
      });
    });
  }
);

module.exports = router;
