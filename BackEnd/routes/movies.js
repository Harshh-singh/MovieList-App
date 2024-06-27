const express = require('express');
const router = express.Router();
const Movie = require('../models/movie_schema');

//fetch all movies from db and send to our client side
router.get('/', async(req,res)=>{
    try {
        const movies = Movie.find();
        const moviesData = (await movies).map((movie)=>movie.toObject());
        res.json(moviesData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//get movies from client side and add to db
router.post('/', async(req,res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(400).json({ message:error.message });
    }
});

//get movie id from client side and delete that in our db
router.delete('/:id', async(req,res)=>{
    const movieId = req.params.id;

    try {
        const deletedMovie = await Movie.findByIdAndDelete(movieId);

        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully', deletedMovie });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
