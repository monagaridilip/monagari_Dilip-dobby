
const User = require('../Models/user.model')
const bcryptjs = require('bcryptjs')
const {errorHandler} = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')

const SecretKey = "SecretKey"
module.exports.signup = async (req,res,next) =>{
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = bcryptjs.hashSync(password,10);
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(401).json({msg:"User already Exits"});
        }
        else{
            user = await User.create({email:email,password:hashedPassword})
            res.status(200).json(user)
        }
    } catch (error) {
        next(error)
    }
}

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id },SecretKey );
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json({rest,token});
    } catch (error) {
      next(error);
    }}