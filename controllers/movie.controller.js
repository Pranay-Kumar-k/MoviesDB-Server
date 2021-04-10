const express = require("express");

const router = express.Router();

const Movie = require("../models/movie.model");

// Route to get all the movies
const getMovies = async(req,res) => {
    try {
        const movies = await Movie.find({}).lean().exec()
        return res.status(200).json({data:movies})
    }
    catch (err) {
        return res.status(404).json({status:'failed', message:"Not Found"})
    }
}

// Create a new movie item and post it to database
const postMovie = async(req,res) => {
    const {id,movie_title,genre,released_year} = req.body;
    try{
        const newMovie = new Movie({id,movie_title,genre,released_year})
        await newMovie.save();
        // console.log(newMovie);
        return res.status(201).json({status:"success", message:"New movie added successfully"});
    }
    catch(err) {
        return res.status(400).json({status:"failed", message:"Post movie not successful"})
    }
}

router.get("/", getMovies);
router.post("/", postMovie);
module.exports = router;