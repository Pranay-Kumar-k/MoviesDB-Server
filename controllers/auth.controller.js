// Getting JWT_SECRET_KEY from dotenv and config it using dotenv library
const jwt = require("jsonwebtoken");

require('dotenv').config();

const User = require('../models/user.model');

const newToken = (user) => {
    return jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY);
}

const register = async(req,res) => {
    console.log(req.body)
    try{
        const user = await User.create(req.body)
        // const token = newToken(user);
        console.log(user)
        return res.status(201).json({status:"success", message:"Registration successful"})
    }
    catch(error) {
        res.status(500).json({status:"failed", message: "Registration Failed - User already exists"+error});
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

    return res.status(200).json({data:{token,user}});
    
}

module.exports = {register,login}