const Blog = require('./blog.model');
const User = require('../Auth/User.model');
const { catchAsync } = require('../config/util');
const cloudinary = require('../config/cloudinary');


const postNewBlog = catchAsync(async (req,res) =>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        const photo = result.secure_url;
        const photoId = result.public_id;
        const userId = req.params.id;
        // console.log({userId});

        const user = await User.findById(userId);
        const {title , subtitle , description , ...otherparams} = req.body ;
        const blog = {
            title,
            subtitle,
            description,
            userId,
            photo,
            photoId,
            ...otherparams,
        }
        await Blog.create(blog);
        // res.send(blog)
        const newBlog = await Blog.find({photoId});
        const blogId = newBlog[0].id;
        res.redirect(`/blog/${userId}/${blogId}`);

    } catch (error) {
        console.log(error)
    }
    
})

const deleteBlog = catchAsync(async (req,res) =>{
    try {
        let currentBlog = await Blog.findById(req.params.blogid);
        if(currentBlog){
            let userId = req.params.id;
            if( userId == currentBlog.userId)
            {
                await currentBlog.delete() ;
                // res.redirect('/blog');
                res.send(currentBlog);
            }
            else{
                res.send('Dont have access to delete this blog :(')
            }
        }
        else{
            res.send('cannot delete this blog :(')
        }
    } catch (error) {
        console.log(error)
    }
    
})

const editBlog = catchAsync(async (req,res) =>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        const photo = result.secure_url;
        const photoId = result.public_id;
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(user)
        {
            const {title , subtitle , description , ...otherparams} = req.body ;
            const blog = {
                title,
                subtitle,
                description,
                userId,
                photo,
                photoId,
                ...otherparams,
            }
            let blogId = req.params.blogid;
            let currentBlog = await Blog.findById(blogId);
            if(currentBlog)
            {
                if(userId == currentBlog.userId)
                {
                    Object.assign(currentBlog , blog)
                    await currentBlog.save();
                    // res.redirect(`/blog/${userId}/${blogId}`);
                    res.send(blog)
                }
                else{
                    res.status(404).send('You are not allowed to edit this blog sir')
                }
                // res.send(`${currentBlog.userId} , ${userId}`)
            }
            else{
                res.status(404).send('errror finding that blog :(');
            }
        }
        else{
            res.status(400).send('Error Finding the user');
        }
    } catch (error) {
        console.log(error)
    }
    
})

const getBlogByBlogId = catchAsync(async (req,res) =>{
    const user = await User.findById(req.params.id)
    const currentBlog = await Blog.findById(req.params.blogid);
    if(currentBlog)
    {
        let blogId = req.params.blogid;
        let view = currentBlog.views;
        await Blog.findByIdAndUpdate(blogId , { $set : { views : view+1 }})
        await currentBlog.save();
        // res.send({currentBlog , view});
        const blog = await Blog.findById(blogId);
        res.render('postedBlog', {blog:blog})

    }
    else{
        res.status(404).send("Error Finding that Blog :(")
    }
})

const getBlogByUserId = catchAsync(async (req,res) =>{
    const user = await User.findById(req.params.id)
    userId = req.params.id ;
    const blogs = await Blog.find({userId : userId});
    res.send(blogs);
})


const increaseLike = catchAsync(async (req,res) =>{
    const user = await User.findById(req.params.id);  
    let blog = await Blog.findById(req.params.blogid);
    userId = req.params.id ;
    let likes = blog.likes ; 
    let alreadyLiked = 0;
    likes.forEach(  likedId =>  {
        if(likedId == userId)
        {
            res.send('already liked');
            alreadyLiked++;
        }
       
    });  
    
    if(alreadyLiked)
    {
        return ;
    }
    else{
        blog = await Blog.findByIdAndUpdate(req.params.blogid , { $push : { likes : userId }});
        res.send(blog);
    }

})


const decreaseLike = catchAsync(async (req,res) =>{
    const user = await User.findById(req.params.id);  
    let blog = await Blog.findById(req.params.blogid);
    userId = req.params.id ;
    let likes = blog.likes ; 
    let alreadyLiked = 0;
    likes.forEach(  likedId =>  {
        if(likedId == userId)
        {
            // res.send('already liked');
            alreadyLiked++;
        }
       
    });  
    
    if(alreadyLiked)
    {
        blog = await Blog.findByIdAndUpdate(req.params.blogid , { $pull : { likes : userId }});
        res.send(blog);
    }
    else{
        
    }

})



module.exports ={
    postNewBlog,
    editBlog,
    deleteBlog,
    getBlogByBlogId,
    getBlogByUserId,
    increaseLike,
    decreaseLike,
}