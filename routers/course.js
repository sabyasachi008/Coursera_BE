
const { Course } = require('../models/course.model')
const { Router } = require('express');
const { Purchase } = require('../models/purchase.model');
const { userMiddleware } = require('../middlewares/user.middleware');
const courseRouter = Router();

courseRouter.get('/preview', async (req, res)=> {
    const courses = await Course.find({});

    if(!courses) {
        return res.status(404).json({message:"No courses found"});
    }

    res.json({
        message:"Courses fetched successfully",
        courses: courses
    })
})

courseRouter.post('/purchase', userMiddleware, async (req, res)=> {

    const userId  = req.userId;
    const courseId = req.body.courseId;

    await Purchase.create({
        userId: userId,
        courseId: courseId,
    });

    res.json({
        message:"You have purchased the course Sucessfully."
    })
})




module.exports = {
    courseRouter : courseRouter
}