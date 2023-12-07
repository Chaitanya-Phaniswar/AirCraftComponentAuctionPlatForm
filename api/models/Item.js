const mongoose=require('mongoose');
const itemSchema = new mongoose.Schema({
    itemTitle :{
        type: String,
        required: true,
    },
    sellerName: {
        type: String,
        required: true
    },
    sellerEmail: {
        type: String,
        required: true
    },
    inInventory: {
        type: Number,
        required: true
    },
    costPerItem: {
        type: Number,
        required: true
    }
})

module.exports=mongoose.model('Item',itemSchema)