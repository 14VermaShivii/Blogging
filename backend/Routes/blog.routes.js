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
 blogRoute.route("/create").post(createBlog)  //routes made for create 
 blogRoute.route("/getallBlog").get(getallBlog) 
 blogRoute.route("/Blog/:id").delete(deleteBlog).patch(updateBlog).get(getBlogbyid)   //routes made for delete


module.exports=blogRoute   //page exported