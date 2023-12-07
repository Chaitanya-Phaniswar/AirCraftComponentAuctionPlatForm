const mongoose=require('mongoose');

const buyerSchema=new mongoose.Schema({
    buyerEmail: {
        type: String,
        required: true,
        unique: true
    },
    buyerName: {
        type: String,
        required: true,
    },
    purchases: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Purchase'
        }
    ],
})
module.exports=mongoose.model('Buyer',buyerSchema)
