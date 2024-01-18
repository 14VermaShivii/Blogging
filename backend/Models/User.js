//***************models******************* */
const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
    createDate: {
        type: Date,
        default: Date.now
    }
})
module.exports= mongoose.model('User',UserSchema)  //PAGE EXPORTED