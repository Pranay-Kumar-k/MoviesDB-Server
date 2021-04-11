// model for movie 
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movie_title: {
        type:String,
        required:true,
        max:250
    },
    genre:{
        type:String,
        required:true
    },
    released_year:{
        type:Number,
        required:true
    }
},{versionKey:false});

module.exports = mongoose.model("movie", movieSchema);