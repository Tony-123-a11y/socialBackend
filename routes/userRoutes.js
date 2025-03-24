const express = require('express')
const { registerUser, loginUser, updateUser, deleteUser, forgotPassword, newPassword, resetPassword } = require('../controllers/userController')
const {body}=require('express-validator')
const  checkToken  = require('../middlewares/token')
const router=express.Router()

router.post('/register',[
     body('firstname').isLength({min:3}),
     body('email').isEmail(),
     body('password').isLength({min:6}).withMessage('Password length must be greater than six characters')
],registerUser)
router.post('/login',loginUser)
router.put('/update',checkToken,updateUser)
router.delete('/delete',deleteUser)
router.post('/forgotPassword',forgotPassword)     
router.get('/newPassword/:randomToken',newPassword)                                                                                        
router.post('/resetPassword/:randomToken',resetPassword)                                                                                        

module.exports=router