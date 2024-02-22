const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const newsletter=new Schema({
   
    email: {
        type: String,
        required: true
    },
    status: {   
        type: Number,
        default: 1
    },
    createdDate:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Newsletter',newsletter)
