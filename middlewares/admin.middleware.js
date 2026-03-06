const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');


function adminMiddleware(req, res, next) {
    try{
        const token = req.headers.token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

        if(decoded) {
            req.userId = decoded.adminId;
            next();

        } else {
            return res.status(401).json({message:"Unauthorized"});
        }
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports = {
    adminMiddleware
}   