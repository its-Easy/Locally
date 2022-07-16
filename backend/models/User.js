const mongoose = require("mongoose")

const userProfileSchema = new mongoose.Schema({
    email: {type: String},
    name: {type: String},
    contact: {type: String},
    address: {
            line1: String,
            line2: String,
            line3: String
        }
})

module.exports = mongoose.model("UserProfile",userProfileSchema)