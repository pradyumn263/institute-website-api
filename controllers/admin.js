const PendingRegistration = require("../models/pendingRegistrations");
const User = require("../models/user");
const Department = require("../models/departments");

const password = require("secure-random-password");

// MARK :- Registration Admin Controller
exports.postPendingRegistration = (req, res, next) => {
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

          return res.json({
            message: "Registration Successful!",
          });
        });
      });
    });
  });
};

// MARK :- Department Admin Routes
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
