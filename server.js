const express=require('express')
const port=8080
const app=express()
const main=require('./database/db')
const cors=require('cors')
const router = require('./routes/userRoutes')

main()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.send('welcome') 
})
app.use('/users',router)
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)   
})