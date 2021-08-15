const express = require("express");
const router = express.Router();

const {
  postPendingRegistration,
  postDepartment,
} = require("../controllers/admin");

router.post("/pending-registration", postPendingRegistration);
router.post("/department", postDepartment);
module.exports = router;
