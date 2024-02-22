const express=require('express')
const newslatterRoute=express.Router();
const{ createNewsletter }=require("../Controllers/newsletterController");


newslatterRoute.route("/new").post(createNewsletter)

module.exports=newslatterRoute