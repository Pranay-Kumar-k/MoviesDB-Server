const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const getAllUsers = async (req,res) => {
    try{
        const users = await User.find({}).lean().exec()
        console.log(users)
        return res.status(200).json({data: users})
    }
    catch(err) {
        res.status(404).json({status:"failed", message:"Not Found"})
    }
}

router.get("/", getAllUsers);
module.exports = router;