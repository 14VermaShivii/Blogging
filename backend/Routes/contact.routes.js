const express=require('express')
const contactRoute=express.Router();
const { createContact }=require("../Controllers/contactController");
contactRoute.route("/new").post(createContact)

module.exports=contactRoute