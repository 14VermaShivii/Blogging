const blogModel = require("../Models/Blog")  //exported

//***************create  blog   id ************* */

exports.createBlog = async (req, res) => {
  try {     //file exported
    const blog = await blogModel.create(req.body)
    res.status(201).json({
      sucess: true,
      message: "blog created sucessfully"
    })
  } catch (error) {
    return res.status(400).json({
      message: "blog does not create",
      error: error.message
    })
  }
}
//***************get data by id************
exports.getBlogbyid = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(400).json({
      message: "blog does not found id",
      error: error.message
    })
  }
};

//**********delete id************ */
exports.deleteBlog = async (req, res, next) => {
  try {
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
  }
  catch (error) {
    return res.status(400).json({
      message: "blog does not deleted",
      error: error.message
    })
  }
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
  try {
    blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true
    })
    res.status(200).json({
      success: true,
      message: "Blog updated successfully"
    })
  }
  catch (error) {
    return res.status(400).json({
      message: "blog does not updated ",
      error: error.message
    })
  }
};
//***********get all blog id************ */
exports.getallBlog = async (req, res) => {                  //file exported
  try {
    const blogs = await blogModel.find(req.query)
    console.log(req.query)                            //for category sports
    if(blogs.length>0){
    res.status(200).json({
      count: blogs.length,                //for count data                       
      sucess: true,
      message: "get all  blog sucessfully",
      blogs
    })
  }else{
    return res.status(400).json({
    count: blogs.length,                                      
      sucess: true,
      message: " No blogs found",
      
    })
  }
  }
  catch (error) {
    return res.status(400).json({
      message: "getallblog does not found",
      error: error.message
    })
  }
}


//for search api*****************

exports.getBlogBySearch = async (req, res) => {
    // console.log(req.query)
    try {
        const blogs = await blogModel.find(
            {
                //  "blogTitle": { $regex :req.query.q }
               
                "$or": [
                    { "blogTitle": { $regex: req.query.q } },
                    { "blogDescription": { $regex: req.query.q } }
                ],
              //   "$and": [
              //     { "blogTitle": { $regex: req.query.q } },
              //     { "blogDescription": { $regex: req.query.q } }
              // ]

                // "$or": [
                //     { "blogTitle": { $regex :req.query.q }}
                // ]




            }
        );
        if (blogs.length > 0) {
            res.status(200).json({
                success: true,
                count: blogs.length,
                blogs
            })
        } else {
            res.status(400).json({
                success: false,
                message: "No blogs found"
            })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.error
        })
    }
};

