const { check } = require("express-validator");

exports.userRegisterValidator = [
  check("name").not().isEmpty().withMessage("Name can't be empty"),
  check("email").isEmail().withMessage("Email is not valid"),
  check("email")
    .contains("nitw.ac.in")
    .withMessage("Please use NITW e-mail address"),
  check("dept").not().isEmpty().withMessage("Please select your department"),
];

exports.userLoginValidator = [
  check("email").isEmail().withMessage("Enter a valid e-mail"),
  check("email").contains("nitw.ac.in").withMessage("Use NITW e-mail address"),
  check("password").isLength({ min: 6 }).withMessage("Password is too short"),
];

exports.userEmailValidator = [
  check("email").isEmail().withMessage("Enter a valid e-mail"),
  check("email").contains("nitw.ac.in").withMessage("Use NITW e-mail"),
];

exports.resetPasswordValidator = [
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("resetPasswordLink").not().isEmpty().withMessage("Token is Required"),
];
