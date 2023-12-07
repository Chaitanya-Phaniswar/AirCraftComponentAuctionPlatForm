const mongoose=require('mongoose');
const Item = require('./Item');
const sellerSchema=new mongoose.Schema({
    sellerName: {
        type: String,
        required: true,
        unique: true
    },
    sellerEmail: {
        type: String,
        required: true,
        unique:true
    },
    Inventory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
      }]
})
module.exports=mongoose.model('Seller',sellerSchema)