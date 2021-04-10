const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const protect = require("../middlewares/protect");

// Get particular user
router.get("/", protect, async(req,res) => {
    console.log(await req.user)
    const user = await req.user;
    return res.status(200).json({data: user});
})

module.exports = router;