const express = require("express")
const app = express()

const body = require("body-parser")


app.use(express.urlencoded())
app.use(express.json())

const cors = require("cors")
app.use(cors())
  
const mongoose = require("mongoose")
// const bodyParser = require("body-parser")
const MONGODB_URL = "mongodb://127.0.0.1:27017/birthday"

const userRoute = require('./routes/Userroutes')
app.use(userRoute)

const ProductRoute = require('./routes/Productroutes')
app.use(ProductRoute)

const OrderRoute = require('./routes/Orderroutes')
app.use(OrderRoute)





// const AuthMiddleware = require('./middleware/Authendicationmiddleware')

app.get("/unprotected",(req,res)=>{
    res.send("Unprotected URL token not needed")
})
// app.get("/protected", AuthMiddleware.verifyToken, (req,res)=>{
//     res.send("Unprotected URL token needed")
// })
mongoose.connect(MONGODB_URL)
.then(() => {
  
    console.log("DB connection Success....")
})
.catch((err) => {
console.log("DB connection Failed" ,err)

})


app.listen(3000,()=>{
    console.log("server listening.. on port 3000.")

})

////multer for file uploading  ///

//import
const multer = require("multer")
const path = require("path")
const { error } = require("console")
// const { productinsert } = require("./controller/Productcontroller")


//following is setting configuration
const  storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./Birthday')
    },
    filename:function(req,file,cb){//three objects received.....that is req,uploading file, cb-configuration function
        cb(null,Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

const uploader = multer ({storage:storage});

app.post('/upload',uploader.single('image'),(req,res) => {
    console.log(req.image,req.body);

    res.status(200).send("file uploaded sucessfully");
})
app.use('/uploads', express.static('./uploads'))