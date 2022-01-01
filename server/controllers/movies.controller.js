const Movie = require('../models/movie.model');

//Get movies  
const getMovies = async (req, res, next) => {

    let movies;
    try {
        movies = await Movie.find({ isMovie: true });

        return res.status(200).json({
            movies: movies.slice(0,10)
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
        shows = await Movie.find({ isMovie: false });
        return res.status(200).json({
            shows: shows.slice(0,10)
        })
    } catch (err) {
        const error = new Error(
            'Fetching shows failed', 500
        );
        return next(error);
    }
}

exports.getMovies = getMovies;
exports.getShows = getShows;
