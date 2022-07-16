const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    email: {type: String,required:true,unique:true},
    items: [{
        id: String,
        img: String,
        name: String,
        seller: String,
        sellerEmail: String,
        price: Number,
        quantity: Number
    }]
})

module.exports = mongoose.model("cart",cartSchema)