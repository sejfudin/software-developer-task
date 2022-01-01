const Movie = require('../models/movie.model');

//Get movies  
const getMovies = async (req, res, next) => {

    let movies;
    try {
        movies = await Movie.find({ isMovie: true });   //isMovie is set to true for every movie

        return res.status(200).json({
            movies: movies.slice(0, 10)
        })
    } catch (err) {
        const error = new Error(
            'Fetching movies failed', 500
        );
        return next(error);
    }
}

//Get shows  
const getShows = async (req, res, next) => {

    let shows;
    try {
        shows = await Movie.find({ isMovie: false });   //isMovie flag is set to false for every show
        return res.status(200).json({
            shows: shows.slice(0, 10)
        })
    } catch (err) {
        const error = new Error(
            'Fetching shows failed', 500
        );
        return next(error);
    }
}

//Rating
const addRate = async (req, res, next) => {

    const { id } = req.params;
    const { rate } = req.body;

    let updatedMovie;
    try {
        updatedMovie = await Movie.findById(id)             //Find the movie that should be rated
    } catch (err) {
        const error = new Error(
            'Movie not found', 500
        );
        return next(error);
    }

    updatedMovie.rating.push(rate);                         //push current rate to the rating array

    try {
        await updatedMovie.save();                          //save changes
    } catch (err) {
        const error = new Error(
            'Rating failed', 500
        );
        return next(error);
    }
    res.status(201).json({ message: "Movie rated successfully" })
}

exports.getMovies = getMovies;
exports.getShows = getShows;
exports.addRate = addRate;
