const contactModel=require("../Models/Contact")

exports.createContact=async(req,res )=>{
    const contact =await contactModel.create(req.body)
    res.status(201).json({
        success:true,
        message:"contact page create succesfully"
    })
}
