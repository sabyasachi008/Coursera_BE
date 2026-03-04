const express = require('express');
const cors = require('cors');
const PORT = 8001;
const { userRouter } = require('./routers/user');
const { courseRouter } = require('./routers/course');
const { adminRouter } = require('./routers/admin');
const { connectToMongoDB } = require('./connect');
 
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res)=> {
    return res.json({ message : "This is course selling app is running..."});
})


app.use('/api/v1/user', userRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/admin', adminRouter);


connectToMongoDB().then(()=> {
    app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((err)=> {
    console.log(err);
})