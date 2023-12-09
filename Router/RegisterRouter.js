const express = require('express')
const Register = require('../Modules/registerModule'); 
const Router = express.Router();


Router.post('/signup',Register.signup);

Router.post('/signin',Register.signin);  


module.exports = Router;