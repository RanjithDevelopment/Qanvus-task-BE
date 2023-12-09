const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const registerRouter = require('./Router/RegisterRouter');
const DB = require('./connection');
const auth = require('./Modules/Authmodule');
const TaskRouter = require('./Router/TaskRouter');
//env variables configuraiton
  dotenv.config();
//calling DB connection function 
DB();
const app = express();
app.use(cors());
app.use(express.json());

//api's
app.use('/api/user',registerRouter);
app.use('/',auth.AuthenticateUser);//authentication middleWare to athunticate the tasks 
app.use('/api/tasks',TaskRouter)
app.listen(process.env.PORT);