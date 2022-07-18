const router = require("express").Router()
const user = require("../models/User")

router.post("/", async (req,res)=>{
    await user.findOne({email:req.body.email},function(err,result) {
        if(err) console.log(err)
        else {
            res.status(200).json(result)
        }
    }).clone()
})

module.exports = router