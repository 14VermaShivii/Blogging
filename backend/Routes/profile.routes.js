const express = require("express");
const router = express.Router();


const { updateProfile,getProfileInfo,logout,changePassword, emailVerify, forgotPassword, resetPassword, updatePassword } = require("../Controllers/profileController");
const { userAuth } = require("../Middleware/auth");
router.route("/profile/:id").patch(userAuth,updateProfile).get(userAuth,getProfileInfo);
router.route("/change-password").post(userAuth,changePassword)
router.route("/verify").get(emailVerify)
router.route("/logout").get(logout)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").get(resetPassword)
router.route("/reset-password").post(updatePassword)


module.exports = router;