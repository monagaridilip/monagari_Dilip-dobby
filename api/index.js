const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const user = require('./routes/user.route')
const image = require('./routes/images.route')

const app = express();

const connectToMongo = () =>{
    try {
        mongoose.connect('mongodb+srv://monagaridilip07:Dilip123@cluster0.ipuub4w.mongodb.net/?retryWrites=true&w=majority&appName=cluster0');
        console.log('Connect to mongoDB')
    } catch (error) {
        console.log(error.message)
    }
}
connectToMongo();

app.use(express.json());
app.use(cors());

app.listen(8080,()=>{
    console.log('Server is running on port 8080')
})
app.use('/api/user',user)
app.use('/api/image',image)


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Error";
    return res.json({
        success:false,
        statusCode,
        errorMessage
    })
})
