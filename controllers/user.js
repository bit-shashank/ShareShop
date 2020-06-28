
const User=require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');



exports.get_all_users=async(req,res)=>{
    //This function will return all the registered users
    try{
        const users=await User.find();
        res.status(200).json(users);
    }catch(err){
        res.send(err);
    }
}


exports.get_user=async(req,res)=>{
    //This function will return the registered user with given id.
    try{
        const user=await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        res.send("Could Not found");
    }
}



exports.login=async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username});
        if(user){
            const match = await bcrypt.compare(req.body.password, user.password);
            if (match){
                //Generating a JSON web token
                const token=jwt.sign(
                    {
                        userId:user._id,
                        mobileNo:user.mobileNo,
                        username:user.username
                    },
                    process.env.JWT_SECRET_KEY,
                    {expiresIn:"1h"}
                );
                return res.status(200).json({
                    "message":"Login Successfully",
                    "user":user,
                    "token":token
                })
            }
        }  
        res.status(401).json({
            "message":"Invalid Username or password"
        })
        
    }
    catch(err){
        res.status(500).json({
            "message":"Internal Server Error",
            "error":err
        })
    }
}


exports.signup=async(req,res)=>{
    //checking if an user already exists with this particular username
    const tempUser=await User.findOne({username:req.body.username});
    if (tempUser){
        //If a user exists simply return with a 409 status.
        return res.status(409).json({
            message:'Username already exists'
        })
    }

    //checking if an user already exists with this particular mobileNo and is verified
    const tempUser2=await User.findOne({mobileNo:req.body.mobileNo});
    if (tempUser2 && tempUser2.verified){
        //If a user exists simply return with a 409 status.
        return res.status(409).json({
            message:'Mobile Number already taken'
        })
    }

    //Generating a hash for the user password
    const saltRounds=10;
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);
    //Add a new user
    //Creating the user object
    const user= new User({
        name:req.body.name,
        referenceId:req.body.referenceId,
        email:req.body.email,
        username:req.body.username,
        password:hashPass,
        mobileNo:req.body.mobileNo,
        verified:false
    });

    //Saving the user details in database
    try{
        const savedData=await user.save();
        res.status(200).json({
            "message":"User Created Succesfully",
            "user":savedData
        });
    }
    catch(err){
        res.status(500).json({
            "message":"Internal Server Error",
            "error":err
        });
    }
}


exports.delete=async(req,res)=>{
    try{
        result=await User.remove({_id:req.params.userId});
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}


exports.clear_all=async(req,res)=>{
    const result=await User.deleteMany({});
    res.json(result);
}

