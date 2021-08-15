const express = require("express");
const router = express.Router();

const { postRegister, postLogin } = require("../controllers/auth");

const { userLoginValidator } = require("../validators/auth");

const { runValidation } = require("../validators/index");

router.post("/login", userLoginValidator, runValidation, postLogin);

module.exports = router;
