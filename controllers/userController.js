const userCollection= require('../userCollection')
const bcrypt=require('bcryptjs')
const {validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const jwtSecret= 'abrakadabra@123'
const nodemailer = require("nodemailer");
const randomstring=require('randomstring')



const registerUser= async (req,res)=>{
    let error=validationResult(req)
   if(!error.isEmpty()){
    return res.status(401).json({error:error.array()})
   }
    let {firstname,lastname,email,password}=req.body
    // let hashedPassword= bcrypt.hashSync(password,salt)
    let user= await userCollection.findOne({email})
    if(user){
      return res.status(201).json({msg:'User already exists!'})
    }
    try{
      let data= await userCollection.insertOne({
        firstname,
        lastname,
        email,
        password
      })
    res.status(200).json({msg:'user created successfully'})
    }
    catch(error){
      console.log(error.message)
      res.send(error.message)
    }
    
}



const loginUser= async (req,res)=>{
  const {email,password}=req.body
  
  let user= await userCollection.findOne({email})
  console.log(user)

  if(user){
  
    let obj={
      firstname: user.firstname,
      lastname: user.lastname,
      email:user.email,
     }
    let match= bcrypt.compareSync(password,user.password)
    
  
    if(match){
      let token = jwt.sign({_id:user._id},jwtSecret,{expiresIn:'24h'})
      res.status(200).json({msg:'User login successful',token})
    }
    else{
      res.status(201).json({msg:'Password or Email is incorrect'})
    }
  }
  else{
   res.status(201).json({msg:'User was not found'})
  }
}



const updateUser= async (req,res)=>{
    const {firstname,lastname,password,email}=req.body
  const id=req.user._id
  let user= await userCollection.findOne({_id:id})
  console.log(user)

  if(firstname){
    user.firstname=firstname
  }
  if(lastname){
    user.lastname=lastname
  }
  if(password){
    user.password=password
  }
  if(email){
    user.email=email
  }

await user.save()
   
   
}
const deleteUser= async (req,res)=>{
    res.send('delete is working')
}
const forgotPassword= async(req,res)=>{
  const randomToken= randomstring.generate(40)
const {email}=req.body
    const user= await userCollection.findOne({email})
    if(user){
      user.resetToken=randomToken
    }
    else{
      return res.status(404).json({msg:'User not found'})
    }
   
    await user.save()
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "ayushsinghatschool@gmail.com",
      pass: "zhqc awaa jfhi tvuv",
    },
  });
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'ayushsinghatschool@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Reset your password", // Subject line
      text: `http://localhost:8080/users/newPassword/${randomToken}`, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  
  main().catch(console.error);
  res.status(200).json({msg:'Check you email!'})
}
const newPassword= async(req,res)=>{
  const {randomToken}=req.params
    res.render('setPassword',{randomToken})
}
const resetPassword= async(req,res)=>{
  let password=req.body
  let token=req.params
  res.send('hello')

}
module.exports={
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
   forgotPassword,
   newPassword,
   resetPassword
}