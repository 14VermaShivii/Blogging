const express =require('express')
const mongoose=require('mongoose')
const app=express()
let mongoDb=require(`./Config/db`)
mongoose.promise = global.promise;
mongoose.connect(mongoDb.db).then(()=>{
    console.log("database connected")
},err=>{
    console.log(`database are ${err}`)
})


const port=process.env.port||8000
app.listen(port,()=>{
console.log(`listening in port ${port}`)
})