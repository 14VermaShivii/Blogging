const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../Helpers/mailer");



const jwtSecret = process.env.JWT_SECRET;//port exported
//register
exports.register = async (req, res, next) => {
    const { firstname, surname, email, password } = req.body; // destructing,json data
    const user=await User.findOne({email})
        if (user) {
            return res.status(400).json({
                status:false,
                message:"email already exists"
            })
        }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" });
    }
//email chacked


    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            firstname,
            surname,
            email,
            password: hash
        })

        
        
            .then((user) => {
                const msg = `Hi, ${firstname} Please verify your email <a href="http://localhost:7000/api/user/verify?id=${user._id}">Verify</a>`

                mailer.sendMail(email, "Mail verfication", msg)  //mail sender*****
                res.status(201).json({
                    message: "User successfully created",
                    user: user
                });
            })
            .catch((error) =>
                res.status(400).json({
                    message: "User not successful created",
                    error: error.message,
                })
            );
    });
};


// login controller


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password is provided
    if (!email || !password) {
        return res.status(400).json({
            message: "email or Password not present",
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({
                message: "Please enter valid email",
                error: "User not found",
            });
        } else {
            // comparing given password with hashed password

            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    if (user.status === 0) {
                        const maxAge = 3 * 60 * 60;
                        const token = jwt.sign(
                            { id: user._id, email },
                            jwtSecret,
                            {
                                expiresIn: maxAge, // 3hrs in sec
                            }
                        );
                        res.cookie("jwt", token, {
                            httpOnly: true,
                            maxAge: maxAge * 1000, // 3hrs in ms
                        });
                        res.status(201).json({
                            message: "User successfully Logged in",
                            user: user._id,
                            role: user.role,
                        });
                    } else {
                        res.status(400).json({ message: "Please varify your email" });
                    }
                } else {
                    res.status(400).json({ message: "Please enter valid password" });
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        });
    }
};





