const { response } = require("express");
const User = require("../models/Usermodel");
const { validationResult } = require("express-validator");
const Uservalidator = require("../validator/Uservalidator");
const bcrypt = require("bcrypt");

exports.userinsert = [
  Uservalidator.validateInsert,
  async (req, res) => {
    const errors = validationResult(req);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (errors.isEmpty()) {
      const user = new User({
        name: req.body.username,
        email: req.body.email,
        contact: req.body.contact,
        password: hashedPassword,
        // hashedPassword:bcrypt.hashedPassword
      });
      user
        .save()
        .then((ele) => {
          res.send(ele);
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.send(errors);
    }
  },
];

exports.userlogin = [
    async (req, res) => {
    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
      name : name,
      // email:email,
    })
      .then(async (user) => {
        if (user) {
          const isFound = await bcrypt.compare(password, user.password);
          if (isFound) {
            res.send({
              userFound: true,
              message: "Login Sucesses",
            })
                      
          } else {
            res.send({
              userFound: false,
              message: "Password  incorrect",
            })
          }
        } else {
          res.send({
            userFound: false,
            message: "Please Register your Details",
          });
        }
      })
      .catch((err) => res.send(err));
  }
]
// exports.userlist = [
//   (req , res) => {
//     User.find()
//     .then((user) => res.send(user))
//     .catch((err) => res.send(err))

//   }
// ]

exports.userdelete = [
  (req,res)=>{
    console.log("Deleting");
    User.deleteOne(
    { _id : req.params.id})
    .then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}]

// / Display the details
exports.userlist = [
  (req,res)=>{
    //User -> Model name
    User.find()
    .then((user)=>{
      res.send(user)
    })
    .catch((err)=>{
      res.send(err)
    })
  }
]
// exports.userlogout = [
//   (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         return res.status(500).send({ success: false, message: 'Logout failed' });
//       }
//       res.clearCookie('connect.sid'); // Clear session cookie
//       return res.send({ success: true, message: 'User logged out' });
//     });
//   }
// ]
exports.userlogout = [(req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.status(500).send({
              success: false,
              message: 'Logout failed'
          });
      }
      res.send({
          success: true,
          message: 'Logout successful'
     });
});
}];