const Order = require("../models/Ordermodel");
const Productmodel = require('../models/Productmodel');



exports.createOrder = async (req, res, next) => {
    const cardItems = req.body;
    // console.log(cartItems)
    // const price = Number(cardItems.reduce((acc, item) => (acc + item.product.price * item.kg), 0)).toFixed(2);
    const price = Number(cardItems.reduce((acc, item) => (acc + item.price * item.kg), 0)).toFixed(2);
    const order = await Order.create({cardItems, price})
    console.log(price)
    res.json(
        {
            success:true,
            order
        }
    )
}


exports.orderlist = [
    (req,res)=>{
      Order.find()
      .then((product)=>{
        res.send(product)
      })
      .catch((err)=>{
        res.send(err)
      })
    }
  ]