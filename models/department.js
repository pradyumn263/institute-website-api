const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const departmentSchema = new mongoose.Schema(
  {
    deptShortName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 10,
    },
    deptFullName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    deptHOD: {
      type: ObjectId,
      ref: "User",
    },
    deptEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
