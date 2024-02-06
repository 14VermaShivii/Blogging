const express = require("express");
const router = express.Router();
//profile
const path=require('path')
const multer=require('multer')

const imageStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../assets/images'))
    },
filename:function(req,file,cb){
    const name=Date.now()+'-'+file.originalname;
    cb(null,name) 
}
})
const upload=multer({storage:imageStorage}).fields([{name:"profilePicture"},{name:"timeline"}]);

const { updateProfile,getProfileInfo,logout,changePassword, emailVerify, forgotPassword, resetPassword, updatePassword } = require("../Controllers/profileController");
const { userAuth } = require("../Middleware/auth");

router.route("/profile").post(userAuth,upload,updateProfile)
// router.route("/profile/:id").patch(userAuth,getProfileInfo).get(userAuth,getProfileInfo);
router.route("/profile/:id").get(userAuth,getProfileInfo);
router.route("/change-password").post(userAuth,changePassword)
router.route("/verify").get(emailVerify)
router.route("/logout").get(logout)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").get(resetPassword)
router.route("/reset-password").post(updatePassword)


module.exports = router;