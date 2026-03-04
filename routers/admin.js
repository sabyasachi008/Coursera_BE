const { Router } = require('express');
const bcrypt = require('bcrypt');
const adminRouter = Router();
const { Admin } = require('../models/admin.model');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');
const { adminMiddleware } = require('../middlewares/admin.middleware');

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

adminRouter.post('/', adminMiddleware, (req, res)=> {
    res.json({ message : "Create course"});
})

adminRouter.put('/', adminMiddleware, (req, res)=> {
    res.json({message: "Update Course"});
})

adminRouter.get('/bulk', (req, res)=> {
    res.json({message: "Get all courses"});
})

module.exports = {
    adminRouter : adminRouter
}