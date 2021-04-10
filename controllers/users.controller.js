const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const getAllUsers = async (req,res) => {
    const users = await User.find({}).lean().exec()
    console.log(users)
    return res.status(200).json({data: users})
}

const postMovie = async(req,res) => {
    const {id,movie_title,genre,released_year} = req.body;
    
}

router.get("/", getAllUsers);
module.exports = router;