const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const getAllUsers = async (req,res) => {
    const users = await User.find({}).lean().exec()
    console.log(users)
    return res.status(200).json({data: users})
}

router.get("/", getAllUsers);

module.exports = router;