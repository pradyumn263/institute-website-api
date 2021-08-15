const mongoose = require('mongoose')

const routesSchema = mongoose.Schema({
    route: {
        type: String,
        required: true
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
})

module.exports = mongoose.model("Routes", routesSchema);