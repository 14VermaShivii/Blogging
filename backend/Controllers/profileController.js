const profileModel = require("../Models/Profile");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
// const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");




// get profile details


exports.getProfileInfo = async (req, res) => {
    const profile = await profileModel.find({ userId: req.params.id }).populate("userId")
    res.status(200).json({
        success: true,
        profile
    })
};


// update products


exports.updateProfile = async (req, res, next) => {
    // let profile = await profileModel.findById(req.params.id);
    let profile = await profileModel.find({ userId: req.params.id }).populate("userId")


    if (!profile) {
        profile = await profileModel.create(req.body);
        // return next(new ErrorHandler("Blog not found",404))
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        })


    }
    profile = await profileModel.updateOne({ userId: req.body.userId }, req.body);
    res.status(200).json({
        success: true,
        profile,
        message: "Profile updated successfully"
    })
};


// change password


exports.changePassword = async (req, res, next) => {
    const { userId,oldpassword,newPassword } = req.body;
    try {
      const user = await User.findOne({ _id:userId });
        bcrypt.compare(oldpassword, user.password).then(function (result) {
          if (result) {
            bcrypt.hash(newPassword, 10).then(async (hash) => {
                await User.updateOne({_id:userId},{
                    password: hash
                })
                  .then((user) => {
                    res.status(200).json({
                      message: "Password Changed Successfully",
                      user:userId
                    });
                  })
                  .catch((error) =>{
                    res.status(400).json({
                      message: "error in password changed",
                      error: error.message,
                    })
                });
              });
          } else {
            res.status(400).json({ message: "Old Password does not match" });
          }
        });
     
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      });
    }
  };


// logout


exports.logout = async (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.status(200).json({
        success: true,
        message: "Logout successfully"
    })
}
