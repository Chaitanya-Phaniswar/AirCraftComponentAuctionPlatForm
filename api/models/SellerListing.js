const mongoose = require('mongoose')

const sellerListingSchema = new mongoose.Schema({
    itemTitle: {
        type: String,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    startingBid: {
        type: Number,
        required: true
    },
    auctionDuration:{
        type: Number,
        required:true
    },
    highestBid: {
        amount : Number,
        buyer: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
sellerListingSchema.virtual('endTime').get(function () {
    const startTime = this.createdAt;  // Assuming you have a createdAt field
    const durationInMilliseconds = this.auctionDuration * 60 * 60 * 1000;  // Convert hours to milliseconds
    return new Date(startTime.getTime() + durationInMilliseconds);
});
module.exports=mongoose.model('SellerListing',sellerListingSchema)