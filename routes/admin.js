const express = require("express");
const router = express.Router();

const {
    postPendingRegistrationAccept,
    postDepartment, postPendingRegistrationReject,
} = require("../controllers/admin");

router.post("/pending-registration-accept", postPendingRegistrationAccept);
router.post("/pending-registration-reject", postPendingRegistrationReject);
router.post("/department", postDepartment);
module.exports = router;
