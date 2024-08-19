const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
{
    cardItems:{type:Array,required:true},
    price:{type:Number,required:true},
},{timestamps:true})
const OrderModel = mongoose.model("Order",OrderSchema)

module.exports = OrderModel