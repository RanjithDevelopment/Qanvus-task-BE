const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {type:String, required: true, trim:true},
    email:{type:String, required: true, trim:true, unique:true} ,
    phoneNo: {type:Number,required:true,length:"10",unique:true},
    dateOfBirth: {type:String,required:true,trim:true},
    password:{type:String, required:true,trim:true},
    confrimPassword: {type:String, trim:true},
    OTP:{type:String , trim:true}
})
const userModel = mongoose.model("Users",userSchema);
module.exports = userModel;