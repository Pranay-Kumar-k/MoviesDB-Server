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
        return res.status(201).json({data:token})
    }
    catch(error) {
        res.status(500).json("Error :"+ error);
    }
    
} 

const login = async(req,res) => {
    return res.send("User")
}

module.exports = {register,login}