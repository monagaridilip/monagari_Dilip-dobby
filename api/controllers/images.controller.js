const Image = require('../Models/images.model')
module.exports.upload =async (req,res,next) =>{
    const { imageName,imageUrl} = req.body;
    try {
        const images = await Image.create({imageName:imageName,imageUrl})
        res.status(200).json(images);
        
    } catch (error) {
        next(error)
    }
    
}