
const { JWT_USER_PASSWORD } = require('../config');
const jwt = require('jsonwebtoken');

function userMiddleware(req, res, next) {
    try {

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);
        
        if(decoded) {
            req.userId = decoded.userId;
            next();
        }
        else {
            return res.status(401).json({message:"Unauthorized"});
        }
    } catch(err)  {
        console.error(err);
        return res.status(403).json({message:"Server Error"})
    }


}

module.exports = {
    userMiddleware,
}