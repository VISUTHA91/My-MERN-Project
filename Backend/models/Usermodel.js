const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
{
    name:{type:String,required:true},
    email:{type:String,required:true},
    contact:{type:String,required:true},
    password:{type:String,required:true}
},{timestamps:true})
const UserModel = mongoose.model("Productuser",ProductSchema)

module.exports = UserModel