const express = require('express')
const authenticate  = require('../middleware/authenticate')
const router = express.Router()
const Purchase = require('../models/Purchase')

router.get('/',authenticate,async(req,res)=>{
    try{
        const {username,userEmail,proffession}= req.user
        if(proffession === 'Buyer'){
            const purchases = await Purchase.find({buyer: username})
            res.status(200).send({error:{class:"success",message:"Purchases Fetched"},purchases: purchases})
        }else{
            const solditems = await Purchase.find({seller: username})
            res.status(200).send({error:{class:"success",message:"Feteched Items Sold"},solditems: solditems})
        }
    }catch(err){
        res.status(400).send({class:"danger",message:"Something went Wrong"})
    }
})
module.exports = router