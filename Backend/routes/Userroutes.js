const express = require("express")
const router = express.Router()

const Usercontroller = require("../controller/Usercontroller")
router.post("/userinsert",Usercontroller.userinsert)
router.delete("/userdelete/:id",Usercontroller.userdelete)
router.get("/userlist",Usercontroller.userlist)
router.post("/userlogin",Usercontroller.userlogin)
router.post("/userlogout",Usercontroller.userlogout)


module.exports = router


