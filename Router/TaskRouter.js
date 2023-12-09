const express = require('express');
const taskModule = require('../Modules/TaskModule');
const Router = express.Router();

Router.post("/add",taskModule.addTask);
Router.get("/get",taskModule.getTasks);
Router.get("/getById",taskModule.getById);
Router.put('/update/:id',taskModule.updateTask);
Router.delete("/delete/:id",taskModule.deleteTask);
module.exports = Router;