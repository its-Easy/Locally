const router = require("express").Router()
const cart=require("../models/cart")

//to send items currently in the cart for requested user
router.post("/", async (req,res)=>{
    await cart.findOne({email:req.body.email},function(err,result) {
        if(err) console.log(err)
        else {
            res.status(200).json(result)
        }
    }).clone()
})

//add/update item for the requested user
router.post("/add", async (req,res)=>{
    try{
        await cart.findOne({email:req.body.email},function(err,result) {
            if(err) console.log(err)
            else {
                var items=result.items,flag=0;

                for(var i=0;i<items.length;i++) {
                    if(items[i].id===req.body.items.id) {
                        items[i].quantity=items[i].quantity+1
                        flag=1;break;
                    }
                }

                //flag :true  -> item already exists just increment count
                //     :false -> item doesn't exist so push the item to cart

                if(!flag) items.push(req.body.items)
                cart.updateOne({email:req.body.email},{$set:{items:items}},function(err,result){
                    if(err) console.log(err)
                    else console.log("Updated cart")
                })
            }
        })
        res.status(200).json("success")
    } catch(err) {
        res.status(500).json(err)
    }
})

//delete item for the requested user
router.post("/delete", async (req,res)=>{
    try{
        await cart.findOne({email:req.body.email},function(err,result) {
            if(err) console.log(err)
            else {
                const items=[]
                for(var i=0;i<result.items.length;i++) {
                    if(result.items[i].id===req.body.items.id) {
                        if(result.items[i].quantity===1) continue;
                        const x = result.items[i]
                        x.quantity--;
                        items.push(x)
                    }
                    else items.push(result.items[i])
                }
                cart.updateOne({email:req.body.email},{$set:{items:items}},function(err,result){
                    if(err) console.log(err)
                    else console.log("Updated cart")
                })
            }
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router