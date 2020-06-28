/*
    This file defines the Schema of an user object
*/
const mongoose =require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    referenceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default: null
    },
    username:{
        type:String,
        unique: true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    mobileNo:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    }
})
module.exports= mongoose.model('User',userSchema);