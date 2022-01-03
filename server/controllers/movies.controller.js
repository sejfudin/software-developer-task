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
    const { rate, userId } = req.body;

    let updatedMovie;
    try {
        updatedMovie = await Movie.findById(id)         //Find the movie that should be rated

    } catch (err) {
        const error = new Error(
            'Movie not found', 500
        );
        return next(error);
    }

    //Make sure that one user can rate the movie just once
    if (!updatedMovie.ratedBy.includes(userId)) {
        updatedMovie.rating.push(rate);                 //push current rate to the rating array
        updatedMovie.ratedBy.push(userId);              //push current user to ratedBy array   

        let sum = updatedMovie.rating.reduce((a, b) => a + b, 0);
        let ratingValue = parseFloat(sum / updatedMovie.rating.length).toFixed(1);
        updatedMovie.ratingValue = ratingValue;

        res.json({ message: "You rate this movie successfully!" })
    }
    else {
        res.json({ message: "You already rated this movie!" })
    }


    try {
        await updatedMovie.save();                      //save changes
    } catch (err) {
        const error = new Error(
            'Rating failed', 500
        );
        return next(error);
    }
}

exports.getMovies = getMovies;
exports.addRate = addRate;
