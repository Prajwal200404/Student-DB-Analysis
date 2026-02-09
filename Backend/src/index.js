require('dotenv').config();
const express=require('express');
const app=express();
const main=require('./config/db');
const cookieParser=require('cookie-parser');
const authRouter=require('./router/userAuth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/user',authRouter);

main().
then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Sever listening at port no: "+ process.env.PORT);
    })
}).catch((err)=>{
    console.log("Error Error"+err);
})