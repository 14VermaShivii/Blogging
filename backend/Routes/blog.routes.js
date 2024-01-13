// const express= require('express')
// const blogRoute = express.Router();
// const Blog= require(`../Models/Blog`)
// blogRoute.route('/').get ((req,res)=>{
//     Blog.find({}).then((data)=>{
//         res.json(data)
//     }).catch((err)=>{
//         res.json(err)
//     })
// })
// module.exports=blogRoute

//**************new code************ */

const express= require('express')
const blogRoute = express.Router();
const {createBlog}=require("../Controllers/blogController")
 blogRoute.route("/create").post(createBlog)
module.exports=blogRoute