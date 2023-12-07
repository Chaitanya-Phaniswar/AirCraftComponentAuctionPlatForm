const jwt =require('jsonwebtoken')
module.exports = async(req,res,next) =>{
        try{
            const token =await req.headers.authorization.split(' ')[1];
            const decoded = await jwt.verify(token,'RANDOM-TOKEN')
            const user = await decoded
            req.user = user
            next();
        }catch(err){
            res.status(400).send({class:"warning",message: 'Unauthorized'})
        }
    }