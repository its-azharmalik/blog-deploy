const express = require('express');
const passport = require('passport');
const User = require('../Auth/User.model');
const router = express.Router();
const profileController = require('./profile.controller') 
const {ensureAuth , ensureGuest} = require('../Auth/auth.config')
const upload = require('../config/multer');


//@desc Redirected after authentication
//@route  GET /profile (User Model)
router.get('/' , (req,res) =>{
    const id = req.user.id;
    console.log(id)
    res.redirect(`/profile/${id}`);
} )

//@desc getting profile of user
//@route  GET /profile/:id (User Model)
router.get('/:id' , ensureAuth , profileController.getProfileByUserId )
//@desc updating profile of user
//@route  POST/UPDATE /profile/:id (User Model)
router.post('/:id' ,ensureAuth, profileController.postProfileByuserId )


//AVATAR
//@desc   posting profile avatar of user
//@route  POST /profile/:id/avatar (User Model)
router.post('/:id/avatar' , upload.single('image'), profileController.postAvatarByUserId )
//@desc   getting profile avatar of user
//@route  GET /profile/:id/avatar (User Model)
router.get('/:id/avatar' ,ensureAuth, profileController.getAvatarByUserId )
//@desc   deleting profile avatar of user
//@route  DELETE /profile/:id/avatar (User Model)
router.delete('/:id/avatar' ,ensureAuth, profileController.deleteAvatarByUserId )
//@desc   updating profile avatar of user
//@route  UPDATE /profile/:id/avatar (User Model)
router.put('/:id/avatar' , upload.single('image') , profileController.updateAvatarByUserId )


module.exports = router
