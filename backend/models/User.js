const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        unique: true,
        required: true
    },

    profilePic: {
        type: String,
        default: ""
    }
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;