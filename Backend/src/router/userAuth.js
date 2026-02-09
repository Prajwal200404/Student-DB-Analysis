const express=require('express');
const authRouter=express.Router();
const {register,login,logout}=require('../controller/userAuthentication')

//register
authRouter.post('/register',register);
//login
authRouter.post('/login',login);

//logout
authRouter.post('/logout',logout);

module.exports=authRouter;