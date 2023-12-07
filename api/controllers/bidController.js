
const SellerListing = require('../models/SellerListing')
const Item = require('../models/Item')
const Seller = require('../models/Seller')
const Buyer = require('../models/Buyer')
const Purchase = require('../models/Purchase')

module.exports.createAuction = async(req,res) => {
    const user = req.user
    const {id}=req.params
    const {itemDescription,auctionDuration,startingBid} = req.body
    const item = await Item.findById(id)
    //console.log(item)
    if(item){
        const newSellerListing = new SellerListing({
            itemTitle: item.itemTitle,
            itemDescription: itemDescription,
            auctionDuration: auctionDuration,
            startingBid: startingBid,
            seller: user.username,
            createdAt: new Date()
        })
        await newSellerListing.save()
        return res.status(201).send({error: {class:"success",message:"Auction Created!"}})
    }else{
        return res.status(400).send({class: "danger",message:"Something is not right"})
    }
}
module.exports.getAuctions =async(req,res)=>{
    //console.log(req.user)
    const {username,proffession} = req.user
    if(proffession === 'Seller'){
        const data = await SellerListing.find({seller: username}).sort("-createdAt")
        return res.status(200).send(data)
    }else{
        //console.log(req.user)
        const data = await SellerListing.find({})
        //console.log(data)
        return res.status(200).send(data)
    }
}

module.exports.createBid = async(req,res)=>{
    const {id }= req.params
    const {username} = req.user
    const {bidAmount} = req.body
    const sellerListing = await SellerListing.findById(id)
    function getAuctionEndDate(createdAt, auctionDuration) {
        const createdAtDate = new Date(createdAt);
        const endTime = new Date(createdAtDate.getTime() + auctionDuration * 60 * 60 * 1000);
        return endTime;
      }
      const p= new Date()
    console.log(getAuctionEndDate(sellerListing.createdAt,sellerListing.auctionDuration) > p)
    if(sellerListing){
        if(getAuctionEndDate(sellerListing.createdAt,sellerListing.auctionDuration) > p){
            const lastbid = sellerListing.highestBid.amount?sellerListing.highestBid.amount:sellerListing.startingBid
            console.log(lastbid,bidAmount)
            if( lastbid < bidAmount){
                sellerListing.highestBid = {amount: bidAmount,buyer: username}
                await sellerListing.save()
                return res.status(201).send({class:"success",message:"Bid Placed Successfully"})
            }
        }
        return res.status(400).send({class:"info",message: "Auction Expired"})
    }else{
        res.status(400).send({class: "info",message: "Auction not Found"})
    }
}

module.exports.deleteAuction = async(req,res)=>{
    const {username} = req.user
    const sellerlisting = await SellerListing.findById(req.params.id)
    if(username === sellerlisting.seller){
        await SellerListing.deleteOne({_id : req.params.id})
        res.status(200).send({class:"warning",message:"Auction Deleted"})
    }
}

module.exports.getMybids = async(req,res)=>{
    const {username} = req.user
    const sellerlisting = await SellerListing.find({'highestBid.buyer' : username})
    //console.log("Hello ",sellerlisting)
    res.status(200).send({error:{class:"success",message:"Bids successfully fetched"},yourbids: sellerlisting})
}

module.exports.complete = async(req,res)=>{
    try{
    const {username,userEmail} = req.user
    //console.log(username,userEmail)
    const bid= await SellerListing.findById(req.params.id)
    //console.log(bid)
    const purchase = new Purchase({itemTitle: bid.itemTitle,itemDescription: bid.itemDescription,seller: bid.seller,boughtAt:bid.highestBid.amount,buyer:username})
    //console.log("What",purchase)
    const buyer= await Buyer.findOne({buyerEmail: userEmail})
    //console.log(buyer,"Nothing")
    buyer.purchases =[...buyer.purchases,purchase]
    //console.log(buyer,purchase,bid,username,"OOK")
    await SellerListing.findByIdAndDelete(req.params.id)
    await purchase.save()
    await buyer.save()
    res.status(200).send({class:"success",message:"Item Bought Successfully"})
    }catch(err){
        res.status(400).send({class:"danger",message:"Bad Request"})
    }
}