const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
{
    name:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    image:{
        data:Buffer,type:String,required:true}
},{timestamps:true})
const ProductModel = mongoose.model("BirthdayProduct",ProductSchema)

module.exports = ProductModel