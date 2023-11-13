const mongoose = require("mongoose");
//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
    },
    email: {
        type: String,
        reqire: true,
        unique: true
    },
    gender: {
        type: String,

    },
    jobTile: {
        type: String,
    }
}, { timestamp: true } // it will add created_at and updated_at upen every creation
);

//Model
const User = mongoose.model("user", userSchema)
module.exports = User