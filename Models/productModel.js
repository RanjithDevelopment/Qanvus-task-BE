const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productName: {type:String,required:true,trim:true},
    quantity: {type:Number,required:true,trim:true},
    price: {type:Number,required:true,trim:true},
    discount: {type:String,required:true,trim:true},
    image:{type:String,required:true,trim:true},
    userId:{type:String,required:true,trim:true},
})

const productModel = mongoose.model("Products",ProductSchema);
module.exports = productModel;