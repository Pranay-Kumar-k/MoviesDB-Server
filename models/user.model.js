// creating a model for user

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
        unique:true,
        minLength:10
      },
      password: {
        type: String,
        required: true,
        min: 6,
      },
},{timestamps:true}, {versionKey:false})

module.exports = mongoose.model("user", userSchema);