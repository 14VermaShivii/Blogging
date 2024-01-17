
//*******************STRUCTURE MADE************

const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const Blog =new Schema({
    blogTitle:{
        type:String
    },
    blogDescripton:{
        type:String
    },
    authorId:{
        type:String
    },
createDate:{
    type:String
}

})
module.exports=mongoose.model('Blog',Blog)