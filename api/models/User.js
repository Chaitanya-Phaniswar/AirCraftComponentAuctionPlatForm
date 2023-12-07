const mongoose =require('mongoose');

const userSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    proffession: {  
        type: String,
        enum: ['Seller', 'Buyer'],
        required: true
    },
    references: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'proffession' 
    },
 
})
module.exports=mongoose.model('User',userSchema)