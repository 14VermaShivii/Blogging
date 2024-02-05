const blogModel = require("../Models/Blog")  //exported
//***************create  blog   id ************* */

exports.createBlog = async (req, res) => {       //file exported
    const blog = await blogModel.create(req.body)
    res.status(201).json({
        sucess: true,
        message: "blog created sucessfully"
    })
}
//***************get data by id************
exports.getBlogbyid = async (req, res) => {
    let blog = await blogModel.findById(req.params.id);
    if (!blog) {
        return res.status(404).json({
            success: true,
            message: "No Blog found"
        })
    }
    res.status(200).json({
        success: true,
        blog
    })
};

//**********delete id************ */
exports.deleteBlog = async (req, res, next) => {
    let blog = await blogModel.findById(req.params.id);
    if (!blog) {
        return res.status(404).json({
            success: true,
            message: "No Blog Found"
        })
    }
    blog = await blogModel.deleteOne();
    res.status(200).json({
        success: true,
        message: "Blog deleted successfully"
    })
};
//***** update blog id****************/
exports.updateBlog = async (req, res) => {
    // let blog = await blogModel.findById(req.params.id);
    // if (!blog) {
    //     return res.status(404).json({
    //         success: true,
    //         message: "No Blog data found"
    //     })
    // }
    blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
        upsert: true
    })
    res.status(200).json({
        success: true,
        message: "Blog updated successfully"
    })
};
//***********get all blog id************ */
exports.getallBlog = async (req, res) => {       //file exported
    const  blogs = await blogModel.find()
    res.status(200).json({
        sucess: true,
        message: "blog get all sucessfully",
        blogs
    })
}