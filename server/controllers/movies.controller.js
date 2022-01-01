const Movie = require('../models/movie.model');

const _ = require('lodash');

//Get movies  
const getMovies = async (req, res, next) => {

    let movies;
    try {
        movies = await Movie.find({ isMovie: true });                                       //isMovie is set to true for every movie

        const unsortedMovies = movies.slice(0, 10).map(movie => {                           //Unsorted array
            let sum = movie.rating.reduce((a, b) => a + b, 0);                              //Sum of all rates
            return {
                _id: movie._id,
                title: movie.title,
                crew: movie.crew,
                year: movie.year,
                image: movie.image,
                rating: movie.rating,
                isMovie: movie.isMovie,
                ratingValue: parseFloat((sum / movie.rating.length).toFixed(1))             //Average of all rates
            }
        })

        const sortedMovies = unsortedMovies.sort(function (a, b) {                          //Sorted response
            return b.ratingValue - a.ratingValue
        })

        return res.status(200).json({
            movies: sortedMovies

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
        shows = await Movie.find({ isMovie: false });                                       //isMovie flag is set to false for every show

        const unsortedShows = shows.slice(0, 10).map(show => {                              //Unsorted array
            let sum = show.rating.reduce((a, b) => a + b, 0);                               //Sum of all rates
            return {
                _id: show._id,
                title: show.title,
                crew: show.crew,
                year: show.year,
                image: show.image,
                rating: show.rating,
                isMovie: show.isMovie,
                ratingValue: parseFloat((sum / show.rating.length).toFixed(1))             //Average of all rates
            }
        })

        const sortedShows = unsortedShows.sort(function (a, b) {                           //Sorted response
            return b.ratingValue - a.ratingValue
        })
        return res.status(200).json({
            shows: sortedShows
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
        updatedMovie = await Movie.findById(id)                                              //Find the movie that should be rated
    } catch (err) {
        const error = new Error(
            'Movie not found', 500
        );
        return next(error);
    }

    updatedMovie.rating.push(rate);                                                         //push current rate to the rating array

    try {
        await updatedMovie.save();                                                          //save changes
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
