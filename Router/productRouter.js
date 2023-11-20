const express = require('express');
const productModule = require('../Modules/productModule');
const Router = express.Router();

Router.post("/add",productModule.addProduct);
Router.get("/get",productModule.getProducts);
Router.put('/update/:id',productModule.updateProducts);
Router.delete("/delete/:id",productModule.deleteProduct);
module.exports = Router;