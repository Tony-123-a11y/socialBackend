const jwt=require('jsonwebtoken')
const jwtSecret= 'abrakadabra@123'
const userCollection= require('../userCollection')

const checkToken= async(req,res,next)=>{
   console.log(req.headers.authorization)
   const token=req.headers.authorization
   let decode= jwt.verify(token,jwtSecret)
   const user=await userCollection.findByIdAndUpdate(decode._id)
   req.user=user
   next()
   res.send('hello')
}

module.exports=checkToken