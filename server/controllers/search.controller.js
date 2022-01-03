const Movie = require('../models/movie.model');
const searching = require('../searching/conditions');

//Searching
const getSearchedMovies = async (req, res, next) => {

    const { term, skip, limit, isMovie } = req.body;

    const query = searching.searchingFunction(term, isMovie)

    try {
        Movie.find(query,
            function (err, docs) {
                return res.status(200).json({
                    movies: docs

                })
            }
        )
            .sort({ ratingValue: -1, _id: 1 })
            .skip(skip)
            .limit(limit)

    } catch (err) {
        const error = new Error(
            'Searching movies failed', 500
        );
        return next(error);
    }
}

exports.getSearchedMovies = getSearchedMovies;