const User=require('../models/User');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const Buyer  =require('../models/Buyer');
const Item = require('../models/Item');

module.exports.register = async (req,res)=>{
    if(!req.body.email || !req.body.password ||!req.body.proffession){
         res.status(400).send({class: "danger",message: "Bad Resquest"})
    }else{
        const {email,username,password} =req.body
        bcrypt.hash(password,10).then(hp => {
                const user = new User({
                    email:email,
                    password: hp,
                    username: username,
                    proffession: 'Buyer'
                })
                //console.log(user)
                const buyer= new Buyer({buyerEmail : user.email,buyerName: username})
                buyer.save().then(()=>{
                    user.references = buyer
                    user.save().then(result =>{
                                return res.status(201).send({class: "success",message: 'Registration Successful'})
                        }).catch(err => {
                            res.status(400).send({class: "danger",message: "Email or Username already exist"})
                        })
                }).catch(err =>{
                    res.status(400).send({class: "danger",message: "Email or Username already exist"})
                })
            }).catch(err =>{
                return res.status(400).send({class: "danger",message: "Incomplete Details"})
        })
    }
}

module.exports.login = async (req,res)=>{
if(!req.body.email || !req.body.password ){
    res.status(400).send({class: "danger",message :"Incomplete Fields"})
}else{
    const {email,password} =req.body
    //console.log(email,password)
    const user =await User.findOne({email:email,proffession: 'Buyer'})
    //console.log(user)
    if (user){
        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign({
            userId: user._id,
            userEmail: user.email,
            username: user.username,
            //userDetails: user.references,
            proffession: 'Buyer'
            },
            "RANDOM-TOKEN",
            {expiresIn: 3600})
            //console.log(user)
            res.status(200).send({error: {class: "success" ,message: "Login Successfull"},user: {mail: user.email,username: user.username,proffession:user.proffession},token: token})
        }else{
            console.log("Invalid Credentials")
            res.status(401).send({class: "danger" ,message: "Invalid Credentials"})
        }
        }else{
            res.status(400).send({class: "danger",message:"User Not found"})
    }
}
}

module.exports.browse =async (req,res)=>{
    const items = await Item.find({})
    res.status(200).send({items})
}