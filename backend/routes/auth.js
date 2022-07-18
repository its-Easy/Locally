const router = require("express").Router()
const User = require("../models/Auth")
const UserProfile = require("../models/User")
const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")
const { default: mongoose, mongo } = require("mongoose")

const generateToken = (id) => {
    const accessToken = jwt.sign({
        id:id,
    },process.env.JWT_SEC,{expiresIn:"3d"})

    return accessToken
}

//REGISTER
router.post("/register", async (req,res)=>{
    const newUser = new User({
        _id: mongoose.Types.ObjectId(req.body.objectId),
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.SEC).toString(),
    })
    const newUserProfile = new UserProfile({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: {
            line1: "",
            line2: "",
            line3: ""
        }
    })
    try{
        const savedUser = await newUser.save()
        const savedUserProfile = await newUserProfile.save()
        res.status(201).json(generateToken(savedUser._id))
    } catch (err) {
        res.status(500).json(err)
    }
})

//LOGIN
router.post("/login", async (req,res) => {
    try{
        console.log("login details received: "+JSON.stringify(req.body))
        const user = await User.findOne({email:req.body.email})
        
        if(!user) {
            res.status(401).json("Wrong credentials!")
            return
        }

        const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.SEC) 
        const password=hashedPassword.toString(CryptoJS.enc.Utf8)
        
        if(password!==req.body.password) {
            res.status(401).json("Wrong credentials!")
            return
        }

        const accessToken = generateToken(user._id)
        
        res.status(200).json(accessToken)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Verify-token
router.post("/verify-token", async (req,res) => {
    const token=req.body.token
    let userId
    jwt.verify(token,process.env.SEC,(err,id) => {
        if(err) console.log('invalid token')
        else userId=id
    })
    id = mongoose.Types.ObjectId(userId)
    const user = await User.findOne({_id:id})

    if(!user) res.status(401).json("invalid")
    else res.status(200).json(user)
})

module.exports = router