const mongoose=require('mongoose')
require('dotenv').config()

async function main(){
     try{
        mongoose.connect(process.env.MongoDB_URL)
        console.log('server connected successfully')
        
     }
     catch(error){
 console.log('Server was unable to establish connection with the database')
 console.log(error.message)
     }
}

module.exports= main