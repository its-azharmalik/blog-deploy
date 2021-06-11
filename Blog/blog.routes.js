const express = require('express');
const router = express.Router();
const blogcontroller = require('./blogs.controller');
const {ensureAuth , ensureGuest} = require('../Auth/auth.config')
const upload = require('../config/multer');
const User = require("../Auth/User.model")

//Blog by an individual user
//@desc   getting blog of a user
//@route  GET /blog/:id/:blogid (Blog Model)
router.get('/:id/myblogs'  , ensureAuth , blogcontroller.getBlogByUserId );





//Blogs
//@desc   posting blog of a user
//@route  POST /blog/:id/newblog (Blog Model)
router.get('/:id/newblog' , ensureAuth, async (req, res) =>  {
    const id = req.params.id
    const user = await User.findById(id);
    res.render('postBlog', {user:user});
})
router.post('/:id/newblog' , ensureAuth ,upload.single('image') , blogcontroller.postNewBlog );


//@desc   Editing blog of a user
//@route  PUT /blog/:id/:blogid (Blog Model)
router.put('/:id/:blogid', ensureAuth , upload.single('image') , blogcontroller.editBlog );
//@desc   deleting blog of a user
//@route  DELETE /blog/:id/:blogid (Blog Model)
router.delete('/:id/:blogid', ensureAuth , blogcontroller.deleteBlog );
//@desc   getting blog of a user
//@route  GET /blog/:id/:blogid (Blog Model)
router.get('/:id/:blogid' , ensureAuth , blogcontroller.getBlogByBlogId );






// // Blog Comments
// //@desc   getting blog of a user
// //@route  GET /blog/:id/:blogid (Blog Model)
// router.get('/:id/:blogid' , ensureAuth, blogcontroller.getBlogByBlogId );


// Blog Likes
//@desc   increasing likes of a blog
//@route  GET /blog/:id/:blogid/like (Blog Model)
router.get('/:id/:blogid/like' , blogcontroller.increaseLike );
//@desc   decreasing likes of a blog
//@route  GET /blog/:id/:blogid/dislike (Blog Model)
router.get('/:id/:blogid/dislike' , blogcontroller.decreaseLike );




// // Blog views
// //@desc   increasing views of a blog
// //@route  GET /blog/:id/:blogid/like (Blog Model)
// router.get('/:id/:blogid' , ensureAuth, blogcontroller.getBlogByBlogId );



module.exports = router ;