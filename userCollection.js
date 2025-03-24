const  bcrypt = require('bcryptjs')
const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minLength:[3,'minimum length is mandatory']

    },
    lastname:{
        type:String,
        required:true,
        minLength:[3,'minimum length is mandatory']

    },
    email:{
        type:String,
        requried:true,
        unique:true         //checks if the email already exists in the database
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

userSchema.add({
    resetToken:{
        type:String,
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    try{
     const salt=await bcrypt.genSalt(10)
     this.password = await bcrypt.hash(this.password, salt)
     next()
    }
    catch(error){
    next(error)
    }
})



const user=mongoose.model('users',userSchema)


module.exports =user