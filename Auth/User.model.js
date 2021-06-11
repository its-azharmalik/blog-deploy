const mongoose = require('mongoose')
const { badgesType } =require('./auth.config')

const UserSchema = new mongoose.Schema({
    googleId : {
        type: String,
        required : true
    },
    displayName : {
        type: String,
        required : true
    },
    firstName : {
        type: String,
        required : true
    },
    lastName : {
        type: String,
        required : true
    },
    avatar : {
        type: String,
        default : null,
    },
    avatarId :{
        type: String,
        default : null,
    },
    createdAt : {
        type : Date,
        default: Date.now
    },
    email : {
        type : String
    } ,
    badges : {
        type : String ,
        enum : badgesType ,
        default : 'Member',
    },
    phone : {
        type : Number ,
        default : null,

    },
    skills : {
        type : String,
        default : null,

    },
    bio : {
        type : String,
        default : null,

    },
    username : {
        type : String,
        default : null,

    },
    achievements : [{
        photo : {
            type : String,
        default : null,

        },
        caption : {
            type : String,
            default : null,

        },
        comments : [{
            type : String,
            userId : {
                type : String,
            }
        }],
        likes : {
            type : Number
        },
    }]
})

module.exports = mongoose.model('User', UserSchema);