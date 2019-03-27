const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connect
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
const users = require("./routes/api/users");
const profiles = require("./routes/api/profilev2");
const plates = require("./routes/api/plates");
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/plates", plates);

// Config
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server start with port ${port}`));
