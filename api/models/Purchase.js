const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
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
    boughtAt: {
        type: Number,
        required: true
    },
    buyer:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports=mongoose.model('Purchase',purchaseSchema)