
const { Course } = require('../models/course.model')
const { Router } = require('express');

const courseRouter = Router();

courseRouter.get('/preview', (req, res)=> {
    res.json({ message : "Get all courses"})
})

courseRouter.post('/purchase', (req, res)=> {
    res.json({ message : "Purchase course"})
})




module.exports = {
    courseRouter : courseRouter
}