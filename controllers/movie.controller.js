const express = require("express");

const router = express.Router();

const Movie = require("../models/movie.model");

// Route to get all the movies
const getMovies = async(req,res) => {
    const movies = await Movie.find({}).lean().exec()
    return res.status(200).json({data:movies})
}

router.get("/", getMovies);
module.exports = router;