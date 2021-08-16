const Department = require("../models/department");
const DepartmentPage = require("../models/departmentPage");

// MARK :- Department Page Controllers
exports.getDepartmentPage = (req, res, next) => {
  const { dept } = req.body;

  Department.findOne({ _id: dept }).exec((err, department) => {
    if (err || !department) {
      return res.json({
        error: "Invalid Department",
      });
    }

    DepartmentPage.findOne({ dept: department }).exec((err, result) => {
      if (err || !result) {
        return res.json({
          error: "Can't find Department Page",
        });
      }

      res.send(
        result.content.reduce((deptPage, item) => {
          deptPage[item.tabTitle] = {
            tabTitle: item.tabTitle,
            tabContent: item.tabContent,
          };
          return deptPage;
        }, {})
      );
    });
  });
};

exports.postDepartmentPage = (req, res, next) => {
  const { dept, content } = req.body;

  Department.findOne({ _id: dept }).exec((err, department) => {
    if (err || !dept) {
      return res.json({
        error: "Invalid Department",
      });
    }

    DepartmentPage.findOne({ dept: department }).exec((err, result) => {
      if (result) {
        return res.json({
          error: "This Department page already exists",
        });
      }

      const newDepartmentPage = new DepartmentPage({
        dept: department,
        content,
      });

      newDepartmentPage.save((err, result) => {
        if (err) {
          console.log(err);
          return res.json({
            error: "Some error occurred while saving this page",
          });
        }

        return res.json({
          message: "Page has been created successfully!",
        });
      });
    });
  });
};

exports.getDepartments = (req, res, next) => {
  Department.find({}, (err, departments) => {
    if (err) {
      return res.json({
        error: "Error while getting all departments",
      });
    }

    res.send(
      departments.reduce((deptMap, item) => {
        deptMap[item.fullName] = {
          id: item._id,
          shortName: item.shortName,
          fullName: item.fullName,
          hod: item.hod,
          email: item.email,
        };
        return deptMap;
      }, {})
    );
  });
};
