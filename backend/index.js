const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const authController = require('./controllers/authController')
const productController = require('./controllers/productController')
const uploadController = require('./controllers/uploadController')


const app = express()

//mongdb connect
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGO_URL,()=> console.log('Mongodb Started Successfully'))

//routes and middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/auth",authController)
app.use("/product",productController)
app.use("/upload",uploadController)



//starting the server
app.listen(process.env.PORT,()=> console.log('Server Started Successfully'));
