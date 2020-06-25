const express=require('express');
const mongoose=require('mongoose');
const app=express()
require('dotenv').config()

//Setting the encodings for post requests
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


//Connecting to the MongoDB Altas Database
const connURL="mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PWD+"@cluster0-avdpm.mongodb.net/"+process.env.DB_NAME+"?retryWrites=true&w=majority";
mongoose.connect(connURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const con=mongoose.connection;
con.on('open', ()=>{
    console.log("Connected To Database");
})


//Setting up the user routes
const userRouter=require('./routes/users');
app.use('/users',userRouter);

const otpRouter=require('./routes/otp');
app.use('/otp',otpRouter);

//Making the server to listen to a port
app.listen(process.env.PORT,()=>{
    console.log("SERVER STARTED.....");
})




