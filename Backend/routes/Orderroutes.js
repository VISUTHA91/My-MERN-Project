const express = require("express")
const router = express.Router()


const Ordercontroller = require("../controller/Ordercontroller")
router.post("/createOrder",Ordercontroller.createOrder)
router.get("/orderlist",Ordercontroller.orderlist)

module.exports = router
