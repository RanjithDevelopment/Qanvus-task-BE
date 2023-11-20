const user = require("../Models/userModel");
//const packageDetails = require("../Models/courierModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);

module.exports.signup = async (req, res, next) => {

    try {
        //check for if the user already exist in db

        const existUser = await user.findOne({ email: req.body.email });
        if (existUser) return res.status(400).send({ msg: "you are already an exists user" });
        //check for password matching 
        const isSamePassword = checkPassword(req.body.password, req.body.confrimPassword);
        if (!isSamePassword) {
            res.status(400).send({ msg: "Password does not match" });
        }
        else {
            delete req.body.confrimPassword;
            //password encryption 
            const randomstring = await bcrypt.genSalt(15);
            req.body.password = await bcrypt.hash(req.body.password, randomstring);
            //save to DataBadse
            let newUser = await new user({ ...req.body });
            await newUser.save();
            //const insertedResponse= await db.collection("Users").insertOne({...req.body});
            res.status(200).send("user creadted successfully");
        }

    }
    catch (err) {
        console.log(err);
    }
};


//password match checking program 
const  checkPassword =(password,confrimpassword)=>{
    return password != confrimpassword ? false: true;
    };


//OTP checking program
const checkOTP = (OTP, reqOTP) => {
    return OTP != reqOTP ? false : true;
};




module.exports.signin = async (req, res, next) => {
 //email validation for signin 

const existUser= await user.findOne({email:req.body.email});

if(!existUser)return res.status(400).send({msg: "you are not a registered user ,please register yourself"});

//password validation for signin
const isValid= await bcrypt.compare(req.body.password,existUser.password);

if(!isValid)return res.status(400).send({msg:"password incorrect"});
//token generation 
const token= jwt.sign({existUser},process.env.SECRET_KEY,{expiresIn:"1h"});

return res.send(token);
};


module.exports.getProductForParticularUser = async (req, res) => {
    try {
        let userID = req.body.currentUser._id;
        let packages = await packageDetails.find({ reciver: userID });

        if (packages.length > 0) {
            res.status(200).send(packages);
        } else {
            res.status(400).send({ msg: 'No packages found for the user' });
        }
    }
    catch (error) {
        console.error({ msg: 'Error in geting particular package data:', error });
        res.status(400).send({ msg: 'Error in geting particular package data' });
    }
}
//function for OTP generation 
function otpGenration() {
    const min = 1000;
    const max = 9999;

    // Generate a random number between min and max
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
}

module.exports.sendingOTP = async (req, res) => {
    try {
        const phoneNo = req.body.phoneNumber;
        let Otp = otpGenration();
        const existingUser = await user.findOne({ phoneNo: phoneNo });


        if (!existingUser) {
            return res.status(400).send({ msg: "you are not a registered user ,please register yourself" });
        }
        else {
            existingUser.OTP = Otp;
            await existingUser.save();
        }
        client.messages
            .create({
                body: `Otp For login into Qanvus-task application is ${Otp}`,
                from: '+14063651760',
                to: `+91${phoneNo}`
            })
            .then(message => {

                return res.status(200).send({ msg: "OTP successfuly Sent to Your Mobile Number" })
            })
            .catch(error => {
                console.log("error in sendingg otp:", error);
                return res.status(404).send({ msg: "Error in sending OTP " })
            });
    } catch (error) {
        console.error({ msg: "error in sending OTP", error });
        res.status(404).send({ msg: "Error in send the Otp to user" })
    }
}

module.exports.changePassword = async(req,res)=>{
 try {
    let email = req.body.currentUser.email
    const userExist = await user.findOne({email:email});
    const isValid= await bcrypt.compare(req.body.oldpassWord,userExist.password);
    const isSamePassword = checkPassword(req.body.newpassword, req.body.confirmNewPassword);
   
        if(isSamePassword && isValid) {
            delete req.body.confrimPassword;
            //password encryption 
            const randomstring = await bcrypt.genSalt(15);
           userExist.password = await bcrypt.hash(req.body.newpassword, randomstring);
           await userExist.save();
           return res.status(200).send({msg:"password updated"});
        }else{
           return res.status(400).send({ msg: "Password does not match" });
        }
   
 } catch (error) {
    console.error({ msg: "not able to change the password", error });
        res.status(404).send({ msg: "not able to change the password" })
 }
}