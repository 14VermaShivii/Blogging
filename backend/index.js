const express =require('express')
const mongoose=require('mongoose')
require('dotenv').config(); 
const app=express()
app.use(express.json()) //middleware*************
//******* */
const cookieParser = require ("cookie-parser")
app.use(cookieParser())

let mongoDb=require(`./Config/db`)
mongoose.promise = global.promise;
mongoose.connect(mongoDb.db).then(()=>{
    console.log("database connected")
},err=>{
    console.log(`database are ${err}`)
})
//**************blog folder************ */
const blogRoute=require(`./Routes/blog.routes`); 
// const cookieParser = require('cookie-parser');
// app.use(express.Router())
app.use('/api/blog',blogRoute) //middlware


const port=process.env.PORT||8000
app.listen(port,()=>{
console.log(`listening in port ${port}`)
})

