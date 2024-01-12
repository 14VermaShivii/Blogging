const express= require('express')
const blogRoute = express.Router();
const Blog= require(`../Models/Blog`)
blogRoute.route('/').get ((req,res)=>{
    Blog.find({}).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })
})
module.exports=blogRoute