const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    imageName:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
})

const image = mongoose.model('Image',ImageSchema);
module.exports = image