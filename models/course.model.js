const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;


const courseSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
       
    },
    description:{
        type: String,
        required: true,
        
    },
    imageUrl:{
        type: String,
        required: true,
     
    },
     price:{
        type: Number,
        required: true,
     
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