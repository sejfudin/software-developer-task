const Movie = require('../models/movie.model');

//Get movies  
const getMovies = async (req, res, next) => {

    let { limit, skip, isMovie } = req.body;

    let movies;
    try {
        movies = await Movie.find({ isMovie: isMovie })
            .sort({ ratingValue: -1, _id: 1 })
            .skip(skip)
            .limit(limit)

        return res.status(200).json({ movies: movies.map(movie => movie.toObject({ getters: true })) })

    } catch (err) {
        const error = new Error(
            'Fetching movies failed', 500
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

    let sum = updatedMovie.rating.reduce((a, b) => a + b, 0);
    let ratingValue = parseFloat(sum / updatedMovie.rating.length).toFixed(1);
    updatedMovie.ratingValue = ratingValue;

    try {
        await updatedMovie.save();                                                          //save changes
    } catch (err) {
        const error = new Error(
            'Rating failed', 500
        );
        return next(error);
    }

    let movies;
    let shows;
    try {
        movies = await Movie.find({ 'isMovie': true });

    } catch (err) {
        const error = new Error(
            'Fetching movies failed', 500
        );
        return next(error);
    }
    try {
        shows = await Movie.find({ 'isMovie': false });

    } catch (err) {
        const error = new Error(
            'Fetching shows failed', 500
        );
        return next(error);
    }

    res.status(201).json({ message: "Movie rated successfully", movies: movies, shows: shows })
}

exports.getMovies = getMovies;
exports.addRate = addRate;
