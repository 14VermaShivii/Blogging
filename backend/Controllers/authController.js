const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const jwtSecret =process.env.JWT_SECRET;//port exported
exports.register = async (req, res, next) => {
    const { firstname, surname, email, password } = req.body; // destructing,json data
    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" });
    }
    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            firstname,
            surname,
            email,
            password: hash
        })
            .then((user) => {
                // const maxAge = 3 * 60 * 60;
                // const token = jwt.sign(
                //   { id: user._id, user: user.firstname},
                //   jwtSecret,
                //   {
                //     expiresIn: maxAge, // 3hrs
                //   }
                // );
                // res.cookie("jwt", token, {
                //   httpOnly: true,
                //   maxAge: maxAge * 1000,
                // });
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
                message: "Login not successful",
                error: "User not found",
            });
        } else {
            // comparing given password with hashed password
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
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
                    res.status(400).json({ message: "Login not succesful" });
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
