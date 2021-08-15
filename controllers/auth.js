const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const _ = require("lodash");

const User = require("../models/user");
const PendingRegistration = require("../models/pendingRegistrations");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

// MARK : Login Exports
exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  PendingRegistration.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error:
          "Your registration is still pending, e-mail will be sent once it's accepted",
      });
    }

    User.findOne({ email }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with that e-mail doesn't exist, please register",
        });
      }

      if (!user.authenticate(password)) {
        return res.status(400).json({
          error: "Wrong e-mail or password",
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "100d",
      });

      const { _id, name, email, role } = user;

      return res.json({
        token,
        user: { _id, name, email, role },
      });
    });
  });
};

// MARK : Register Exports
exports.postRegister = (req, res, next) => {
  const { name, email, dept } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.json({
        error: "E-Mail is already taken",
      });
    }

    PendingRegistration.findOne({ email }).exec((err, user) => {
      if (user) {
        return res.json({
          error:
            "Registration request is already created, please wait for an email",
        });
      }
      const newRegistrationRequest = new PendingRegistration({
        name,
        email,
        dept,
      });

      newRegistrationRequest.save((err, result) => {
        if (err) {
          console.log(err);
          return res.json({
            error: "Some error occurred, please try again later",
          });
        }

        return res.json({
          message:
            "Registration request created, you will receive an email once it's accepted",
        });
      });
    });
  });
};
