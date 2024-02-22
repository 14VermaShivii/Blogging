const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const contact=new Schema({
   
   fullname:{
    type:String
   },
    email: {
        type: String,
        required: true
    },
    website: {   
        type: String,
        
    },
    message:{
        type:String
    },
    createdDate:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Contact',contact)