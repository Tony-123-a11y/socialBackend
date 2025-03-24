const mongoose=require('mongoose')
async function main(){
     try{
        mongoose.connect('mongodb://127.0.0.1:27017/socailMedia')
        console.log('server connected successfully')
        
     }
     catch(error){
 console.log('Server was unable to establish connection with the database')
 console.log(error.message)
     }
}

module.exports= main