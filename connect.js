const mongoose = require('mongoose');


async function connectToMongoDB() {
    return mongoose.connect('mongodb://127.0.0.1:27017/courseSellingApp')
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
    