const mongoose = require("mongoose");
const crypto = require("crypto");

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 100,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    dept: {
      type: ObjectId,
      ref: "Department",
      required: true,
    },
    hashed_password: {
      type: String,
      trim: true,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: "member",
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText).toString() === this.hashed_password;
  },

  encryptPassword: function (p) {
    if (!p) return "";
    try {
      return crypto.createHmac("sha1", this.salt).update(p).digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userSchema);
