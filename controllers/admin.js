const AWS = require("aws-sdk");
const _ = require("lodash");

const PendingRegistration = require("../models/pendingRegistrations");
const User = require("../models/user");
const Department = require("../models/department");

const password = require("secure-random-password");

const {
  acceptPendingRegistrationEmailParams,
  rejectPendingRegistrationEmailParams,
} = require("../helpers/email");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

// MARK :- Registration Admin Controllers
exports.postPendingRegistrationAccept = (req, res, next) => {
  const { email, role } = req.body;
  PendingRegistration.findOne({ email }).exec((err, pendingRegistration) => {
    if (err || !pendingRegistration) {
      return res.json({
        error: "Pending registration not available, please try again",
      });
    }

    const { name, dept } = pendingRegistration;
    const userPassword = password.randomPassword({
      length: 10,
      characters: [password.lower, password.upper, password.digits],
    });
    console.log(`User Password: ${userPassword}`);
    Department.findOne({ deptShortName: dept }).exec((err, department) => {
      if (err || !dept) {
        return res.json({
          error: "Department doesn't exist.",
        });
      }

      const newUser = new User({
        name,
        email,
        dept: department,
        password: userPassword,
        role,
      });

      newUser.save((err, result) => {
        if (err) {
          console.log(err);
          return res.json({
            error: "Some error occurred while creating a new user",
          });
        }

        PendingRegistration.findOneAndRemove({ email }).exec((err, result) => {
          if (err) {
            console.log(err);
            return res.json({
              error: "Could not delete pending registration request",
            });
          }

          const params = acceptPendingRegistrationEmailParams(
            email,
            userPassword
          );

          const sendEmailOnAccept = ses.sendEmail(params).promise();

          sendEmailOnAccept
            .then((data) => {
              console.log("Email submitted to SES", data);
              return res.json({
                message: `Email has been sent to ${email}`,
              });
            })
            .catch((err) => {
              console.log("SES Email on register, error", err);
              return res.status(401).json({
                error: `Email could not be sent to the user`,
              });
            });
        });
      });
    });
  });
};

exports.postPendingRegistrationReject = (req, res, next) => {
  const { email, reason } = req.body;

  const params = rejectPendingRegistrationEmailParams(email, reason);

  PendingRegistration.findOneAndRemove({ email }).exec((err, result) => {
    if (err || !result) {
      return res.json({
        error:
          "Could not delete the pending registration request, please try again later.",
      });
    }
    const sendEmailOnReject = ses.sendEmail(params).promise();

    sendEmailOnReject
      .then((data) => {
        return res.json({
          message: `Email has been sent to ${email}`,
        });
      })
      .catch((err) => {
        console.log(
          `PENDING REGISTRATION REJECT: Error in sending email. Error: ${err}`
        );
        return res.json({
          error: "Email could not be sent to the user.",
        });
      });
  });
};

// MARK :- Department Admin Controllers
exports.postDepartment = (req, res, next) => {
  const { deptShortName, deptFullName, deptEmail } = req.body;

  Department.findOne({ deptShortName }).exec((err, department) => {
    if (err || department) {
      return res.json({
        error: "There is an error, or department already exists",
      });
    }

    const newDepartment = new Department({
      deptShortName,
      deptFullName,
      deptEmail,
    });

    newDepartment.save((err, result) => {
      if (err) {
        return res.json({
          error: "Could not save new department",
        });
      }

      return res.json({
        message: "Department Successfully Created",
      });
    });
  });
};
