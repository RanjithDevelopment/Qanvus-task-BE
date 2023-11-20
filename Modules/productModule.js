const productModel = require('../Models/productModel');
const { ObjectId } = require('mongodb');
module.exports.addProduct = async (req, res) => {
    try {
        const product = await new productModel({
            productName: req.body.productName,
            quantity: req.body.quantity,
            price: req.body.price,
            discount: req.body.discount,
            image: req.body.image,
            userId: req.body.currentUser._id,
        })
        await product.save();
       return res.status(200).send({msg:"product added successfully"});
    } catch (error) {
        console.error("Error in adding Product", error);
       return res.status(400).send({ msg: "can't able to add the product" })
    }
}

module.exports.getProducts = async(req,res)=>{
    try {

        const allProducts = await productModel.find({userId:req.body.currentUser._id});
        return res.status(200).send(allProducts)
    } catch (error) {
        console.error("error in geting products",error);
        return res.status(400).send({ msg: "can't able to get the products" })
    }
}

module.exports.updateProducts= async(req,res)=>{
    try {
        const updated = await productModel.findByIdAndUpdate(req.params.id,{...req.body})
        if(updated){
        return res.status(200).json({ updated });
        }

    } catch (error) {
        console.error("error in Updating products",error);
        return res.status(400).send({ msg: "can't able to update the products" })
    }
};

module.exports.deleteProduct = async(req,res)=>{
    try {
        const isValid = ObjectId.isValid(req.params.id);
       
        if(isValid){
           const remove = await productModel.deleteOne({ _id: new ObjectId(req.params.id) });
        if(remove){
           return res.status(200).json({ remove });
        }
       }
       return res.status(404).send({msg:"can't able to delete"})
    } catch (error) {
        console.error("error in deleting products",error);
        return res.status(400).send({ msg: "can't able to delete the products" })
    }
}