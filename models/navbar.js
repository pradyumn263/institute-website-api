const mongoose = require('mongoose')

const navbarSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        max: 20,
    },
    destination: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        default: "internal"
    },
    href: {
        type: String,
        required: true,
        default: "/"
    },
    dropdown: [
        {
            title: {
                type: String,
                trim: true,
                required: true
            },
            destination: {
                type: String,
                trim: true,
                required: true,
                lowercase: true,
                default: "internal"
            },
            href: {
                type: String,
                required: true,
                default: "/"
            }
        }
    ]
});

module.exports = mongoose.model("NavbarItem", navbarSchema);