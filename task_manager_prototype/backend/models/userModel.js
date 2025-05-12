const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

userSchema.statics.signup = async function(username, email, password){
    if(!email || !password || !username){
        throw Error("Email, username, or password blank");
    }
    if(!validator.isEmail(email)){
        throw Error("Email invalid");
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Weak password");
    }

    const exists = await this.findOne({ email: email });
    if(exists){
        throw Error("Email already in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({username, email, password: hash});
    return user;
}

userSchema.statics.login = async function(inputField, input, password){
    if(!input || !password){
        throw Error("One of the fields is blank");
    }
    const user = await this.findOne({ [inputField]: input});
    if(!user){
        throw Error(`Incorrect ${inputField}: ${input}`);
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error("Incorrect password");
    }
    return user;
}

module.exports = mongoose.model("User", userSchema); 