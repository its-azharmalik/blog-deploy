const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    subtitle : {
        type : String,
    },
    description : {
        type : String,
        required : true,
    },
    userId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    photo : {
        type : String,
        required : true,
    },
    photoId :{
        type : String,
        required : true,
    },
    likes :[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    }],
    views :{  
        type :Number,
        default : 0,
    },
    comments : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',
    }],
    writtenAt : {
        type : Date,
        default : Date.now,
    },
});

module.exports = mongoose.model('Blog' , blogSchema);