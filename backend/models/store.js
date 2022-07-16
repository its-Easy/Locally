const mongoose = require("mongoose")

const storeSchema = new mongoose.Schema({
    id: String,
    title: String,
    url: String,
    locality: String,
    contact: String,
    items: [
        {
            img: String,
            name: String,
            price: String
        },
    ]
})

module.exports = mongoose.model("store",storeSchema)
