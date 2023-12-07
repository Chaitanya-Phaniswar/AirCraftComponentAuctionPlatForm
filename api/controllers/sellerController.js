const Seller = require('../models/Seller')
const Item = require('../models/Item')
const User=require('../models/User');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');

module.exports.register = async (req,res)=>{
    if(!req.body.email || !req.body.password ){
        res.status(400).send({message: "Bad Resquest"})
    }else{
      const {email,password,username} =req.body
      bcrypt.hash(password,10)
        .then(hp => {
          const user = new User({
            email:email,
            password: hp,
            username: username,
            proffession: 'Seller'
          })
          seller = new Seller({sellerName: username,sellerEmail: email})
          seller.save().then((seller) => {
            user.references = seller
            user.save().then(result =>{
                return res.status(201).send({error:{class:"success",message: "Seller Registration Successful"},seller: seller._id,email:seller.sellerEmail})
              }).catch(err => {
                return res.status(400).send({class:"danger",message: err.msg})
              })
            }).catch(err =>{
                return res.status(400).send({class:"danger",message:"User already Exist"})
            })
        }).catch(err =>{
          return res.send({class:"danger",message:"Incomplete Password"})
        })
      }
}

module.exports.login = async (req,res)=>{
    if(!req.body.email || !req.body.password){
      res.status(400).send({message :"Incomplete Fields"})
    }else{
        const {email,password} =req.body
        const admin =await User.findOne({email:email,proffession: 'Seller'})
        if (admin){
            if(await bcrypt.compare(password,admin.password)){
              const token = jwt.sign({
                userId: admin._id,
                userEmail: admin.email,
                username: admin.username,
                proffession: "Seller"
              },
              "RANDOM-TOKEN",
              {expiresIn: 3600})
              console.log("Seller Login")
              res.status(200).send({error:{class:"info",message:"Seller Login Successfull"},user: {mail: admin.email,username: admin.username,proffession: admin.proffession},token})
            }else{
              //console.log("Invalid Credentials")
              res.status(401).send({class:"danger",message: "Invalid Credentials"})
            }
          }else{
              res.status(400).send({class:"danger",message:"User Not found"})
          }
    }
}  

module.exports.getInventory = async (req,res)=>{
    const {userEmail} =req.user
    const seller =await Seller.findOne({sellerEmail: userEmail}).populate('Inventory')
    const inventory=seller.Inventory
    res.status(200).send({message:"Inventory Fetched",Inventory:seller.Inventory})
}

module.exports.addItem = async(req,res)=>{
    const newItem = req.body
    const {userEmail} =req.user
    const seller =await Seller.findOne({sellerEmail: userEmail}).populate('Inventory')
    const newlyadd = new Item({costPerItem: newItem.costPerItem,itemTitle: newItem.itemName,inInventory: newItem.inInventory,sellerName: seller.sellerName,sellerEmail:seller.sellerEmail})
    await newlyadd.save()
    seller.Inventory = [...seller.Inventory,newlyadd]
    await seller.save()
    //console.log(seller)
    res.status(200).send({error:{class:"success",message:"Successful"},Inventory: seller.Inventory})
}

module.exports.deleteItem = async(req,res)=>{
    const id=req.params.id
    const ok = await Item.findByIdAndDelete(id)
    const seller = await Seller.findOne({email:req.user.userEmail}).populate('Inventory')
    //console.log(seller)
    let inventory = seller.Inventory && seller.Inventory.filter(x => x._id !== id)
    seller.Inventory=inventory
    //console.log(seller.Inventory)
    await seller.save()
    res.status(200).send({message: "Successfull"})
}