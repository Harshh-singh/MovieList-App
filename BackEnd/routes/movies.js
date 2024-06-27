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

//find a movie with id
router.get('/:id', async(req,res)=>{
    const movieId = req.params.id;
    try{
        const selectedMovie = await Movie.findById(movieId);
        if(!selectedMovie){
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(selectedMovie);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
})

//change watched status of movie
router.put('/:id/watchedStatus', async(req,res) => {
    const movieId = req.params.id;
    try{
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        movie.watched = !movie.watched;
        await movie.save();
        res.json(movie);

    }catch(error){
        console.error('Error toggling movie watched status:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

//edit movie details
router.get('/:id/editDetails', async(req,res)=>{
    const movieId = req.params.id
    try{
        const selectedMovie = await Movie.findById(movieId);
        if(!selectedMovie){
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(selectedMovie);
        console.log("from backend",selectedMovie);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
})

//change movie details
router.put('/:id/changeDetails', async(req,res)=>{
    const movieId = req.params.id;
    const movieData = req.body;

    try {
        const movie = await Movie.findById(movieId);
        if(selectedMovie){
            movie.title = movieData.title || movie.title;
            movie.description = movieData.description || movie.description;
            movie.releaseYear = movieData.releaseYear || movie.releaseYear;
            movie.genre = movieData.genre || movie.genre;

            await movie.save();
            return res.status(200).json({ message: 'Movie details updated', movie });
        } else {
            // Create new movie
            movie = new Movie(movieData);
            await movie.save();
            return res.status(201).json({ message: 'New movie created', movie });
        }
    } catch (error) {
        console.error('Error updating or creating movie:', error);
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
