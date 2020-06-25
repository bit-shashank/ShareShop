const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN); 
const OTP=require('../models/otp');
const { text } = require('body-parser');


/*
    Test function to send OTP to a particular number
*/
exports.send_otp=async(req,res)=>{

    //Generating a random 6 digit random OTP 
    const ranOTP=Math.floor(100000 + Math.random() * 900000);
    const ttx=5*60*1000; // time to expire is 5 minutes 

    //Creating a new OTP document
    const otp=new OTP({
        mobileNo:req.params.mobileNo,
        otp:ranOTP,
        createdOn:Date.now(),
        expiresOn:Date.now()+ttx
    });
    try{
        //Delete any past otp data with this number 
        await OTP.deleteMany({mobileNo:req.params.mobileNo});

        //Saving new OTP in database
        const savedOTP=otp.save();

        //Sending SMS to client
        result=await client.messages.create({ 
            body: "Your verification code is :"+ranOTP, 
            from: '+12702296922',       
            to: otp.mobileNo 
        }) 
        res.status(200).json({
            "message":"Otp Sended successfully",
            "response":result,
            "sended":await savedOTP
        });
    }
    catch(err){
        res.status(500).json({
            "mesage":"Could not send OTP",
            "error":err
        })
    }
}


exports.verify_otp=async (req,res)=>{
    try{
        const otp=await OTP.findOne({
            mobileNo:req.body.mobileNo,
            otp:req.body.otp
        });

        if(otp){
            const currTime=Date.now();
            const expiryTime=new Date(otp.expiresOn).getTime();
            if (currTime<expiryTime){
                return res.status(200).json({
                    "message":"OTP verified"
                })
            }
        }
        res.status(401).json({
            "message":"Invalid OTP"
        })
    }
    catch(err){
        res.status(500).json({
            "mesage":"Internal Server Error",
            "error":err
        })
    }
}

exports.get_all=async(req,res)=>{
    const data=await OTP.find();
    res.json(data);
}

exports.clear_all=async(req,res)=>{
    const result=await OTP.deleteMany({});
    res.json(result);
}