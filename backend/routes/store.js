const router = require("express").Router()
const store=require("../models/store")

router.post("/", async (req,res)=>{
    const storeID=req.body.id;
    //storeID is the unique id for each digital store
    
    store.find({id:storeID},function(err, result) {
        if(err) console.log(err)
        else {
            res.json(result)
        }
    })
})

module.exports = router