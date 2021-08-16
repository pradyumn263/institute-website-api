const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const departmentSchema = new mongoose.Schema(
  {
    shortName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 10,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    hod: {
      type: ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
