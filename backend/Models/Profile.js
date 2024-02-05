const mongoose=require("mongoose")
const profileSchema=new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
about:{
    type:String
},
dob:{
    type:String
},
createdDate:{
    type:Date,
    default:Date.now
},
profilePicture:{
    type:String,
    required:true
}
})
module.exports=mongoose.model('Profile',profileSchema)