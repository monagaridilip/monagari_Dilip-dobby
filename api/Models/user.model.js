const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const user = mongoose.model('User',UserSchema)
module.exports = user;
