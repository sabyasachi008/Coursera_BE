
const { Router } = require('express');
const { User } = require('../models/user.model');
const { purchaseModel } = require('../models/purchase.model');
const userRouter = Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { JWT_USER_PASSOWRD } = require('../config');


userRouter.post('/signup', async (req, res)=> {
    try {
        const { email, password, firstName, lastName, firstname, lastname } = req.body;
        
        const hasedPass = await bcrypt.hash(password, saltRounds);;
        const user = new User({ 
            email, 
            password: hasedPass, 
            firstName: firstName , 
            lastName: lastName,
        });
        await user.save();
        res.json({ message : "User created successfully"});
            
    } catch(err) {
        console.error(err);
        res.status(500).json({message: "Internal Server Error"});
    }
})

userRouter.post('/signin', async (req, res)=> {
    try {

        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        
        if(!user) {
            return res.status(403).json({message:"User Not found!."});
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(403).json({message:"Invalid Password"});
        }
        
        const token = jwt.sign({ userId: user._id}, JWT_USER_PASSOWRD);
        res.json({message:"User logged in successfully", token});
    }
    catch(err) {
        console.error(err);
        res.status(500).json({message: "Internal Server Error"});
    }


})

userRouter.get('/purchases', (req, res)=> {
    try {

    } 
    catch(err) {
        console.error(err);
        return res.json({message: "Internal Server Error"});
    }
})


module.exports =  {
    userRouter : userRouter
}