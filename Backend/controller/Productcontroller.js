const BirthdayProduct = require("../models/Productmodel");
const path = require("path")

const multer = require("multer")
const  storage = multer.diskStorage({
  destination:function(req,file,cb){
      cb(null,'./uploads')
  },
  filename:function(req,file,cb){//three objects received.....that is req,uploading file, cb-configuration function
      cb(null,Date.now() + path.extname(file.originalname))//Appending extension
  }
})
const uploader = multer({storage: storage})



exports.productinsert = [
  (req, res, next)=>{
    // console.log(req.body)
    next()
  },
  uploader.single("image"),
  (req,res) =>
    {
      console.log(req.body)
        const product = new BirthdayProduct({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            category:req.body.category,
            image:req.file ? req.file.filename : null
        })
        product.save()
        .then((ele) => {
            res.send(ele)
        })
        .catch((err) =>{
            res.send(err)
        })
    }
]
exports.productlist = [
      (req,res)=>{
        BirthdayProduct.find()
        .then((product)=>{
          res.send(product)
        })
        .catch((err)=>{
          res.send(err)
        })
      }
    ]
exports.productdetails =  [
  (req,res)=>{
    const id = req.params.id;
    // console.log(id)
    BirthdayProduct.findById(id)
    .then((product)=>{
      res.send(product)
    })
    .catch((err)=>{
      res.send(err)
    })
  }
]
exports.getProducts = async (req, res, next) => {
  const query = req.query.keyword?{ name : { 
      $regex: req.query.keyword,
      $options: 'i'
   }}:{}
  //  console.log(query)
  const products = await BirthdayProduct.find(query);
  res.json({
      success: true,
      products
  })
}
exports.getcategoryProducts = async (req, res, next) => {
  const query = req.query.category?{ category : { 
      $regex: req.query.category,
      $options: 'i'
   }}:{}
  //  console.log(query)
  const products = await BirthdayProduct.find(query);
  res.json({
      success: true,
      products
  })
}

// exports.searchproducts = [(req,res)=>{
// const query = req.query.keyword
// console.log(query)
//   BirthdayProduct.find({name :{$eq:query}})
//       .then((product) => {
//           res.send(product)
//           console.log(product)
//       })
//       .catch((err) =>{
//           res.send(err)
//       })
// }]

exports.find = [(req,res)=>{
  BirthdayProduct.find({price:{$lt:850}})
      .then((product) => {
          res.send(product)
      })
      .catch((err) =>{
          res.send(err)
      })

}]

exports.productdelete = [
  (req,res)=>{
    console.log("Deleting");
    BirthdayProduct.deleteOne(
    { _id : req.params.id})
    .then((product)=>{
    res.send(product)
  }).catch((err)=>{
    res.send(err)
  })
}]

exports.productupdate =[
  (req,res)=>{
    BirthdayProduct.updateOne(
    { _id : req.params._id},
    {$set:{
      name:req.body.name,
            price:req.body.price,
            description:req.body.description,
        category:req.body.category
    }}
    )
    // BirthdayProduct.save()
    .then((product)=>{
    res.send(product)
  }).catch((err)=>{
    res.send(err)
  })

}]