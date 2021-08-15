const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const facultyProfileSchema = new mongoose.Schema({
    facultyId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    dept: {
        type: ObjectId,
        ref: "Department",
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 100
    },
    title: {
        type: String,
        trim: true,
        required: true,
        max: 100
    },
    areasOfInterest: [
        {
            type: String,
            trim: true,
            max: 100,
        }
    ],
    image: {
        type: String,
        trim: true,
        max: 400
    },
    content: {
        time: {
            type: Date
        },
        blocks: [
            {
                id: {
                    type: String
                },
                type: {
                    type: String
                },
                data: {
                    type: {}
                }
            }
        ],
        version: {
            type: String
        }
    }

});

module.exports = mongoose.model("FacultyProfile", facultyProfileSchema);