const express = require("express")
const router = express.Router()

// const Usercontroller = require("../controller/Usercontroller")
const Productcontroller = require("../controller/Productcontroller")
router.post("/productinsert",Productcontroller.productinsert)
router.get("/productlist",Productcontroller.productlist)
router.get("/productdetails/:id",Productcontroller.productdetails)
router.get("/searchproduct",Productcontroller.getProducts)
router.get("/getcategoryProducts",Productcontroller.getcategoryProducts)
router.get("/find",Productcontroller.find)
router.delete("/productdelete/:id",Productcontroller.productdelete)
router.put("/productupdate/:_id",Productcontroller.productupdate)


// router.post("/userinsert",Usercontroller.userinsert)
// router.post("/userlogin",Usercontroller.userlogin)
// router.get("/userlist",Usercontroller.userlist)



module.exports = router