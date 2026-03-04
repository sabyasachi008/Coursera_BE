const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;


const courseSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30
    },
    description:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30
    },
    price:{
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30
    },
    image:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30
    },
    creatorId: ObjectId,
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Course = mongoose.model('Course', courseSchema);

module.exports = {
    Course: Course
};