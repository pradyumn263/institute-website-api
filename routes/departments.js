const express = require("express");
const {
  getDepartments,
  getDepartmentPage,
} = require("../controllers/departments");
const router = express.Router();

const { postDepartmentPage } = require("../controllers/departments");

router.get("/department-page", getDepartmentPage);
router.post("/department-page", postDepartmentPage);
router.patch("/department-page");
//
// router.post("/department-page/side-tab");
// router.delete("/department-page/side-tab");

router.get("/departments", getDepartments);

module.exports = router;
