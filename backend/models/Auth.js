const mongoose = require("mongoose")

const userAuthSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    email: String,
    password: String
})

module.exports = mongoose.model("UserAuth",userAuthSchema)