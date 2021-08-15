const mongoose = require('mongoose')

const pendingRegistrationsSchema = new mongoose.Schema(
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
            type: String,
            required: true
        },
    }
);

module.exports = mongoose.model("PendingRegistration", pendingRegistrationsSchema);