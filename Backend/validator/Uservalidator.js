const User = require("../models/Usermodel");
const {body, validationResult} = require("express-validator")


exports.validateInsert = [
    body("username").trim().isLength({min: 5}).withMessage("User Name must be 5 Character")
    // body("email").trim().isEmail().withMessage("Enter Valid Email Address"),
    // body("name").trim().isLength({min: 5}).withMessage("User Name already Exist")
    .custom((value)=>{
    return User.findOne({name:value})
  .then((productuser)=>
      {
      if(productuser){
        return Promise.reject("User Name Already Exist")
      }
      })
  }),

]