// Getting JWT_SECRET_KEY from dotenv and config it using dotenv library
const jwt = require("jsonwebtoken");

require('dotenv').config();

const User = require('../models/user.model');

const newToken = (user) => {
    return jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY);
}

const register = async(req,res) => {
    try{
        const user = await User.create(req.body)
        const token = newToken(user);
        console.log(token)
        return res.status(201).json({data:{token}})
    }
    catch(error) {
        res.status(500).json({status:"failed", message:"User already exists"});
    }
    
} 

const login = async(req,res) => {

    // We will find the user with the phone number
    let user;
    try {
        user = await User.findOne({phone:req.body.phone}).exec();
        // console.log(user)
        if(!user) {
            res.status(401).json({status:"failed", message:"Invalid credentials"});
        }
    }
     catch(err) {
         res.status(500).json({status:"failed", message:"Something went wrong"});
     }
    
    // We will try to match the password entered by the user and the password in our database with same phone number
    
    try{
        const match = await user.checkPassword(req.body.password)
        // console.log(match)
        if(!match) {
            res.status(401).json({status:"failed", message:"Invalid credentials"});
        }
    }
    catch(err) {
        res.status(500).json({status:"failed", message:"Something went wrong"});
    }

    const token  = newToken(user);

    return res.status(200).json({data:{token}});
}

module.exports = {register,login}