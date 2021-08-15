const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const tabContent = new mongoose.Schema({
    tabTitle: {
        type: String,
        required: true,
    },
    tabContent: {
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
})

const departmentSchema = new mongoose.Schema({
    deptShortName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 10
    },
    deptFullName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    deptHOD: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    deptEmail: {
        type: String,
        required: true,
    },
    content: [tabContent]
}, {timestamps: true});

module.exports = mongoose.model("Department", departmentSchema);