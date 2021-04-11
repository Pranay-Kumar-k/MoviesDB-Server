const express = require("express");

const router = express.Router();

const Movie = require("../models/movie.model");

const protect = require("../middlewares/protect");

// Route to get all the movies
const getMovies = async (req,res) => {
    try {
        const movies = await Movie.find({}).lean().exec()
        return res.status(200).json({data:movies})
    }
    catch (err) {
        return res.status(404).json({status:'failed', message:"Not Found"})
    }
}

// Create a new movie item and post it to database
const postMovie = (req,res) => {
    const {movie_title,genre,released_year} = req.body;
    // console.log(req.body.movie_title)
    try{
        Movie.create({movie_title,genre,released_year})
        .then((movie) => res.status(201).json({movie}))
    }
    catch(err) {
        return res.status(400).json({status:"failed", message:"Post movie not successful"})
    }
}

// Get a movie by its ID 
const getMovieById = async (req,res) => {
    const {id} = req.params;
    console.log(id)
    try {
        const movie = await Movie.findOne({_id:id}).lean().exec()
        console.log(movie,id)
        return res.status(200).json({data:movie})
    }
    catch(err) {
        return res.status(404).json({status:"failed", message:"Item not found"})
    }
}

// Edit a movie and update it on Database

const editMovie = (req,res) => {
    const {movie_title,genre,released_year} = req.body
    Movie.findOneAndUpdate({
        movie_title,genre,released_year
    }).then((movie) => res.status(202).json({status:"success", message:"record update successfull"}))
    .catch(err => res.status(404).json({status:"failed", message:"record not found"})
)}

const deleteMovie = (req,res) => {
    const _id = req.params.id;
    Movie.findByIdAndDelete(_id)
    .then(() => res.status(200).json({status:"success", message:"Delete movie successful"}))
    .catch((err) => res.status(404).json({status:"failure", message:"record not found"}));
}


router.get("/",protect, getMovies);
router.post("/",protect, postMovie);
router.get("/:id",protect, getMovieById);
router.put("/:id",protect, editMovie);
router.delete("/:id",protect, deleteMovie);

module.exports = router;