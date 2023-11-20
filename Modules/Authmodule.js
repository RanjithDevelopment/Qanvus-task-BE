const jwt = require("jsonwebtoken");

module.exports.AuthenticateUser = async (req,res,next)=>{
try {
//check for token in headers

if(!req.headers.accesstoken)return res.status(400).send({msg:"token not found"});

//validating token
const existuser= jwt.verify(req.headers.accesstoken,process.env.SECRET_KEY);

req.body.currentUser=existuser.existUser;

next();
}
catch(err){
    console.log(err);
    return res.status(400).send({msg:"Unathorized"})
}


};
