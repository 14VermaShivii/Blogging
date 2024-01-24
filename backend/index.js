const express =require('express')
const mongoose=require('mongoose')
require('dotenv').config(); 
const app=express()
app.use(express.json()) //middleware*************
//******* cookie**********/
const cookieParser = require ("cookie-parser")
app.use(cookieParser())
//***************    */
let mongoDb=require(`./Config/db`)
mongoose.promise = global.promise;
mongoose.connect(mongoDb.db).then(()=>{
    console.log("database connected")
},err=>{
    console.log(`database are ${err}`)
})
//**************blog folder************ */
const blogRoute=require(`./Routes/blog.routes`); //route of blog
const authRoute=require(`./Routes/auth.routes`) //route of auth
const profileRoute=require(`./Routes/profile.routes`) //route of profile
// const cookieParser = require('cookie-parser');
// app.use(express.Router())
app.use('/api/auth',authRoute) //middleware of auth
app.use('/api/blog',blogRoute) //middlware of blog
app.use('/api/user',profileRoute)//middleware of profile


//*******port exported********* */
const port=process.env.PORT||8000
app.listen(port,()=>{
console.log(`listening in port ${port}`)
})

