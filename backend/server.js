const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected successfully !"))
    .catch((err) => {
        console.log(err)
    })
    
app.use(express.json())
app.use(cors())
const authRoute = require("./routes/auth")
const storeRoute = require("./routes/store")
const cartRoute = require("./routes/cart")
const placeOrderRoute=require("./routes/placeOrder")
const userProfile=require("./routes/userDetails")

app.use("/auth",authRoute)
app.use("/store",storeRoute)
app.use("/cart",cartRoute)
app.use("/place-order",placeOrderRoute)
app.use("/user-details",userProfile)

app.listen(process.env.PORT,() => {
    console.log("Backend server running")
})