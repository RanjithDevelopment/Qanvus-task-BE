const express = require('express')
const Register = require('../Modules/registerModule'); 
const Router = express.Router();
const auth = require('../Modules/Authmodule');
Router.post('/signup',Register.signup);
Router.post('/sendotp',Register.sendingOTP);
Router.post('/signin',Register.signin);  
Router.use('/',auth.AuthenticateUser);
Router.post('/changepassword',Register.changePassword);
module.exports = Router;