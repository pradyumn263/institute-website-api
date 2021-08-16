const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const tabContent = new mongoose.Schema({
  tabTitle: {
    type: String,
    required: true,
  },
  tabContent: {
    time: {
      type: Date,
    },
    blocks: [
      {
        id: {
          type: String,
        },
        type: {
          type: String,
        },
        data: {
          type: {},
        },
      },
    ],
    version: {
      type: String,
    },
  },
});

const departmentPageSchema = new mongoose.Schema(
  {
    dept: {
      type: ObjectId,
      ref: "Department",
      required: true,
    },
    content: [tabContent],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DepartmentPage", departmentPageSchema);
