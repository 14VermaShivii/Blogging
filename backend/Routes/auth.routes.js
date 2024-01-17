//*********auth routes************** */
const express=require('express')
const blogRoute=express.Router()
const {register}=require("../Controllers/authController")
router.route("/register").Post(register)

module.exports=router