const blogModel = require("../Models/Blog") 
exports.createBlog=async(req,res)=>{       //file exported
    const blog=await blogModel.create(req.body)
    res.status(201).json({
        sucess:true,
        message:"blog created sucessfully"
    })
}