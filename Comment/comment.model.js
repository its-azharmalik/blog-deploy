const mongoose = require('mongoose');
const {commentType} = require('../Auth/auth.config');

const commentSchema = new mongoose.Schema({
    commentType :{
        type : String,
        enum : commentType,
    },
    comment :{
        type : String,
        required: true,
    },
    likes : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    }],
    commentUserId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
})

module.exports = mongoose.model('Comment' , commentSchema);