const User = require('../Auth/User.model');
const { catchAsync } = require('../config/util');
const cloudinary = require('../config/cloudinary');
const blogModel = require('../Blog/blog.model');

const getProfileByUserId = catchAsync(async (req,res) =>{
    const user = await User.findById(req.params.id)
    // res.send({user})
    res.render('profile', {user:user});
})



const postProfileByuserId = catchAsync(async (req,res) =>{
    const user = await User.findById(req.params.id)
    const _id =req.params.id;
    const {bio , achievements , username , email, phone ,skills , ...otherparams} = req.body ;
    const newUser = {
        googleId : user.googleId,
        displayName : user.displayName,
        firstName : user.firstName,
        lastName : user.lastName,
        bio, 
        achievements,
        username,
        email,
        phone, 
        skills,
        ...otherparams
    }
    Object.assign(user , newUser);
    // User.replaceOne({_id} , {bio : bio})
    await user.save();
    res.send(user);
})

const postAvatarByUserId = async (req,res) =>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        const id = req.params.id ;
        await User.findByIdAndUpdate(id , {avatar : result.secure_url , avatarId : result.public_id})
        res.send(result);
    } catch (error) {
        console.log(error)
    }
}

const getAvatarByUserId = async (req,res) =>{
    try {
        let user = await User.findById(req.params.id);
        res.send({user});
    } catch (error) {
        console.log(error)
    }
}

const deleteAvatarByUserId = async (req,res) =>{
    try {
        let user = await User.findById(req.params.id)
        await cloudinary.uploader.destroy(user.avatarId);
        user.avatarId = null;
        user.avatar = null ;
        await user.save()
        res.send(user);
    } catch (error) {
        console.log(error)
    }
}

const updateAvatarByUserId = async (req,res) =>{
    try {
        const id = req.params.id ;
        let user = await User.findById(req.params.id)
        await cloudinary.uploader.destroy(user.avatarId)
        const result = await cloudinary.uploader.upload(req.file.path)
        user = await User.findByIdAndUpdate(id , {avatar : result.secure_url , avatarId : result.public_id } , {new : true});
        res.send({user})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProfileByUserId ,
    postProfileByuserId,
    postAvatarByUserId,
    getAvatarByUserId,
    deleteAvatarByUserId,
    updateAvatarByUserId,
}
