const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        is_breaking_news: {
            type: Boolean,
            default: false
        },
        url: {
            type: String,
            required: true
        },
        start_date: {
            type: Date,
            default: Date.now()
        },
        end_date: {
            type: Date,
            default: Date.now() + 90 * 24 * 60 * 60 * 1000
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Job", jobsSchema);