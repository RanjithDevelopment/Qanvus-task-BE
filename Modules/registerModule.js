const user = require("../Models/userModel");
//const packageDetails = require("../Models/courierModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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


