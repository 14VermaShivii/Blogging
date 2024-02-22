const newslatterModel= require("../Models/Newsletter")

exports.createNewsletter= async(req ,res)=>{
    const newsletter =await newslatterModel.create(req.body)
    res.status(201).json({
        success:true,
        message:"Newsletter create succesfully"
    })
}