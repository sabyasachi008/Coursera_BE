const mongoose = require('mongoose');
require('dotenv').config();

async function connectToMongoDB() {
    return mongoose.connect(process.env.MONGO_URL)
    .then(()=> {
        console.log("DB connected");
    })
    .catch((err)=> {
        console.log(err);
    })
}

module.exports = {
    connectToMongoDB: connectToMongoDB
};
    