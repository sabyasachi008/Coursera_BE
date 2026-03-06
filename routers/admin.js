const { Router } = require('express');
const bcrypt = require('bcrypt');
const adminRouter = Router();
const { Admin } = require('../models/admin.model');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');
const { adminMiddleware } = require('../middlewares/admin.middleware');
const { Course } = require('../models/course.model');


adminRouter.post('/signup', async (req, res)=> {
   try {
    const { email, password, firstName, lastName } = req.body;

    const hashedPass  = await bcrypt.hash(password, saltRounds);
    const admin = new Admin({ email, password: hashedPass, firstName, lastName });
    await admin.save();
    res.json({message: "Admin created successfully"});
   } catch(err) {
    console.error(err);
    res.status(500).json({message: "Internal Server Error"});
   }
})

adminRouter.post('/signin', async (req, res)=> {
    
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if(!admin) {
            return res.status(403).json({message:"Invalid Creds"});
        }        

        const isPassVal = await bcrypt.compare(password, admin.password);
        if(!isPassVal) {
            return res.status(403).json({message:"Invalid Creds"});
        }

        const token = jwt.sign({ adminId: admin._id }, JWT_ADMIN_PASSWORD);
        res.json({message:"Admin logged in successfully", token});
    }
    catch(err) {
        console.error(err);
        res.status(500).json({message: "Internal Server Error"});
    }
})

adminRouter.post('/course', adminMiddleware, async (req, res)=> {
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;

    const course = await Course.create({ 
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    });
    await course.save();
    res.json({ message: "Course created successfully", courseId: course._id });
    

})

adminRouter.put('/course', adminMiddleware, async (req, res)=> {
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;
    
    // alternate way to check if the course is created by the same user who want's to modify it 
    // const course = await Course.findOne({_id: courseId, creatorId: adminId});
    // if(!course) {
    //     return res.status(403).json({message:"Course not found"});
    // }

    const result = await Course.updateOne({    //check for both course ID and the creatorID should match 
        _id: courseId,
        creatorId: adminId,
    }, 
        { 
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
    });
    res.json({ message: "Course Updated successfully", courseId: courseId });
})

adminRouter.get('/course/bulk', adminMiddleware, async (req, res)=> {

    const adminId = req.userId;

    if(!adminId) {
        return res.status(403).json({message: "Admin not found"});
    }
    const course = await Course.find({
        creatorId: adminId
    });
    if(!course) {
        return res.status(403).json({message:"No courses found"});
    }

    return res.json({message:"Courses fetched successfully", course: course});
})

module.exports = {
    adminRouter : adminRouter
}