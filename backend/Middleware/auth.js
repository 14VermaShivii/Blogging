const jwt = require("jsonwebtoken")
const jwtSecret = "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd"
exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err) => {
            if (err) {
                return res.status(401).json({
                    message: "not Authorised"
                })
            } else {
                next();
            }
        })
    } else {
        return res.status(401).json({
            message: "no token found"
        })
    }
}