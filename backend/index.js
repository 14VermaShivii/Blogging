const express =require('express')
const mongoose=require('mongoose')
require('dotenv').config(); 
const app=express()
app.use(express.json()) //middleware*************
const cors = require("cors")  //middleware of cors
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
app.use(cors());                          //route of core
const blogRoute=require(`./Routes/blog.routes`); //route of blog
const authRoute=require(`./Routes/auth.routes`) //route of auth
const profileRoute=require(`./Routes/profile.routes`); //route of profile
const newsletterRoute = require('./Routes/newsletter.routes'); //route of newsletter
const contactRoute = require('./Routes/contact.routes');
// const cookieParser = require('cookie-parser');
// app.use(express.Router())
app.use('/api/auth',authRoute) //middleware of auth
app.use('/api/blog',blogRoute) //middlware of blog
app.use('/api/user',profileRoute)//middleware of profile
app.use('/api/newsletter',newsletterRoute) //middleware of newsletter
app.use('/api/contact',contactRoute)

    
//*******port exported********* */
const port=process.env.PORT||8000
app.listen(port,()=>{
console.log(`listening in port ${port}`)
})
            
