const router = require("express").Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User"); //Load User Model
const keys = require("../../config/keys");
const validateRegister = require("../../validation/register");
const validateLogin = require("../../validation/login");

// @route GET api/users/register
// @desc  Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json({ email: "Email already exists." });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" // default
      });

      // create new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      //hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc  Login user / return jwt
// @access Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLogin(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find user
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // create jwt payload

        //jwt sign
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Invalid password";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/current
// @desc  return current user
// @access Public
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route DELETE api/users/id
// @desc  Delete user
// @access Public
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id).then(user => {
    if (user) {
      user.remove().then(user => res.json({ msg: "Del success" }));
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  });
});

// @route GET api/users/
// @desc  GET all user
// @access Public
router.get("/", (req, res) => {
  User.find()
    .sort({ name: 1 })
    .then(users => {
      res.json(users);
    });
});

// @route GET api/users/date
// @desc  GET user with date
// @access Public
router.get("/:date", (req, res) => {
  User.find({ create_date: req.params.date }).then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  });
});

module.exports = router;
