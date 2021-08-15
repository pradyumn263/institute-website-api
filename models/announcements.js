const mongoose = require('mongoose')

const announcementsSchema = new mongoose.Schema({
        title: {
            type: String,
            trim: true,
            required: true,
            maxlength: 300
        },
        isBreakingNews: {
            type: Boolean,
            default: false
        },
        url: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            default: Date.now()
        },
        endDate: {
            type: Date,
            default: Date.now() + 90 * 24 * 60 * 60 * 1000
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Announcement", announcementsSchema);