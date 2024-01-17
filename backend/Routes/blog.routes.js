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
const {createBlog,getBlogbyid,deleteBlog,updateBlog,getallBlog}=require("../Controllers/blogController")
const{userAuth}=require("../Middleware/auth") //auth route
 blogRoute.route("/create").post(userAuth,createBlog)  //routes made for create 
 blogRoute.route("/getallBlog").get(getallBlog) //routes made for getallblog
 blogRoute.route("/Blog/:id").delete(userAuth,deleteBlog).patch(userAuth,updateBlog).get(getBlogbyid)   //routes made for delete




module.exports=blogRoute   //page exported


