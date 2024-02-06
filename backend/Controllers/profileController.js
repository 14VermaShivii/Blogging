const profileModel = require("../Models/Profile");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const mailer = require("../Helpers/mailer")
const PasswordReset = require("../Models/PasswordReset");
const rs = require("randomstring");
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


// update profile


// exports.updateProfile = async (req, res, next) => {
//   let profile = await profileModel.updateOne({ userId: req.body.userId }, req.body, {
//     new: true,
//     upsert: true
//   });
//   res.status(200).json({
//     success: true,
//     profile,
//     message: "Profile updated successfully"
//   })
// };

//new code of image
exports.updateProfile = async (req, res, next) => {
  try {
    // return res.status(200).json({
      
    // })
    const { userId, about, dob } = req.body;
    const profile = await profileModel.updateOne({ userId }, {
      about: about,
      dob: dob,
      profilePicture: 'images/' + req.files.profilePicture[0].filename,
      timeline: 'images/' + req.files.timeline[0].filename
    }, {
      new: true,
      upsert: true,
    })
 
    return res.status(200).json({
      success:true,
      message: "images uploaded successfully"
      
    })
   
  }
  catch (error) {
    return res.status(400).json({
      message: "images does not uploaded",
      error: error.message
    })
  }
}

// change password


exports.changePassword = async (req, res, next) => {
  const { userId, oldpassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    bcrypt.compare(oldpassword, user.password).then(function (result) {
      if (result) {
        bcrypt.hash(newPassword, 10).then(async (hash) => {
          await User.updateOne({ _id: userId }, {
            password: hash
          })
            .then((user) => {
              res.status(200).json({
                message: "Password Changed Successfully",
                user: userId
              });
            })
            .catch((error) => {
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

// email verify

exports.emailVerify = async (req, res) => {
  try {
    const getUser = await User.findOne({ _id: req.query.id });
    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    } else {
      if (getUser.status == 0) {
        return res.status(400).json({
          success: false,
          message: "Email already verified"
        })
      } else {
        await User.updateOne({ _id: req?.query?.id }, {
          status: 0
        })
          .then((user) => {
            return res.status(200).json({
              message: "Congratulations ! Email varified Successfully"
            });
          })
          .catch((error) => {
            return res.status(400).json({
              message: "verification error",
              error: error.message,
            })
          });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: "verification error",
      error: error.message,
    })
  }
}
//forgot password


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const getUser = await User.findOne({ email });
    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "Email not found"
      })
    } else {
      await PasswordReset.deleteMany({ userId: getUser._id }) //only one delete id remain
      const randomString = rs.generate();
      await PasswordReset.create({
        userId: getUser._id,
        token: randomString
      })
        .then((user) => {
          const msg = `Hi, ${getUser.firstname} Please click to reset your password <a href="http://localhost:7000/api/user/reset-password?token=${randomString}">Reset Password</a>`
          mailer.sendMail(email, "Reset password", msg)
          return res.status(200).json({
            message: "Password reset link sent to your email successfully. Please check"
          });
        })
        .catch((error) => {
          return res.status(400).json({
            message: "error",
            error: error.message,
          })
        });
    }


  } catch (error) {
    return res.status(400).json({
      message: "verification error",
      error: error.message,
    })
  }
}

//************reset password*****************
exports.resetPassword = async (req, res) => {
  try {
    const token = req.query.token
    const gettoken = await PasswordReset.findOne({ token });
    if (!gettoken)
      return res.status(404).json({
        success: true,
        message: "token not found"
      })
    else {
      return res.status(200).json({
        success: true,
        userId: gettoken.userId
      })
    }
  }
  catch (err) {
    return res.status(400).json({
      message: "reset error",
      // error: error.message,
    })
  }
}
//updatePassword***************************************
exports.updatePassword = async (req, res) => {
  try {
    const { userId, comformPassword, newPassword } = req.body;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "user id not found"
      })
    }

    const getuser = await User.findOne({ _id: userId })
    if (!getuser) {
      return res.status(404).json({
        success: false,
        message: "user not found"
      })
    }
    if (newPassword !== comformPassword) {
      return res.status(404).json({
        success: false,
        message: "Password and conform passwors does not match"
      })
    }

    bcrypt.hash(comformPassword, 10).then(async (hash) => {
      await User.updateOne({ _id: userId }, {
        password: hash
      })
        .then((user) => {
          res.status(200).json({
            message: "Password reset Successfully",
            user: userId
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: "error in password changed",
            error: error.message,
          })
        });
    });


  } catch (error) {
    res.status(400).json({
      message: "update error occurred",
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


