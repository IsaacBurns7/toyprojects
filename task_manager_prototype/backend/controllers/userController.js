const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_STRING, {expiresIn: '3d'});
}

const loginUser = async (req, res) => {
    const { inputField, input, password } = req.body;
    try{ 
        const user = await User.login(inputField, input, password);
        const token = createToken(user._id);

        res.status(200).json({inputField: input, token});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        const user = await User.signup(username, email, password);
        const token = createToken(user._id);

        res.status(200).json({username, token});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    loginUser, 
    signupUser
}