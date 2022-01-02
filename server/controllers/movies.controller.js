const Movie = require('../models/movie.model');

//Get movies  
const getMovies = async (req, res, next) => {
    let { limit, skip } = req.body;

    try {
        Movie.aggregate([
            { "$match": { "isMovie": true } },                                              //Find only movies
            {
                "$addFields": {
                    "rating_avg": { "$avg": "$rating" }                                     //Add field rating_avg - calculate average rate
                }
            },
            { "$sort": { "rating_avg": -1 } },                                              //Sort by rating_avg desc
            { "$skip": skip },
            { "$limit": limit }                                                             //Limit to 10 movies per request
        ], function (err, movies) {
            if (err) {
                console.log(err)
            } else {
                return res.status(200).json({
                    movies: movies.map(movie => {
                        let sum = movie.rating.reduce((a, b) => a + b, 0);                  //Sum of all rates
                        let ratingValue = parseFloat(sum / movie.rating.length);            //Average of all rates                   
                        return {
                            _id: movie._id,
                            title: movie.title,
                            crew: movie.crew,
                            year: movie.year,
                            image: movie.image,
                            rating: movie.rating,
                            isMovie: movie.isMovie,
                            ratingValue: ratingValue,
                        }
                    })
                })
            }
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
    let { limit, skip } = req.body;

    try {
        Movie.aggregate([
            { "$match": { "isMovie": false } },                                             //Find only shows
            {
                "$addFields": {
                    "rating_avg": { "$avg": "$rating" }                                     //Add field rating_avg - calculate average rate
                }
            },
            { "$sort": { "rating_avg": -1 } },                                              //Sort by rating_avg desc
            { "$skip": skip },
            { "$limit": limit }                                                             //Limit to 10 showa per request
        ], function (err, shows) {
            if (err) {
                console.log(err)
            } else {

                return res.status(200).json({
                    shows: shows.map(show => {
                        let sum = show.rating.reduce((a, b) => a + b, 0);                   //Sum of all rates
                        let ratingValue = parseFloat(sum / show.rating.length);              //Average of all rates  
                        return {
                            _id: show._id,
                            title: show.title,
                            crew: show.crew,
                            year: show.year,
                            image: show.image,
                            rating: show.rating,
                            isMovie: show.isMovie,
                            ratingValue: ratingValue
                        }
                    })
                })
            }
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

    let sum = updatedMovie.rating.reduce((a, b) => a + b, 0);
    let ratingValue = parseFloat(sum / updatedMovie.rating.length);
    updatedMovie.ratingValue = ratingValue;

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

//Searching
const getSearchedMovies = async (req, res, next) => {

    const { filter } = req.params;

    let isNumber;

    //Checking if a user has entered a number
    if (!filter.charAt(2))
        isNumber = parseInt(filter);

    //If number is entered, user wants search by year
    let query = {};
    if (!isNaN(isNumber)) {
        query = { "year": isNumber }
    }

    //Cases is a user did not enter a number
    if (isNaN(isNumber)) {
        let year;

        //If user enter a word "after" that means he wants a results after entered year
        if (filter.includes("after")) {
            year = filter.slice(5);
            query = { "year": { $gt: year } }
        }

        //If user enter a word "before" that means he wants a results before entered year
        else if (filter.includes("before")) {
            year = filter.slice(6);
            query = { "year": { $lt: year } }
        }

        //If user enter a word "older than" that means he wants movies older than number of years he entered
        else if (filter.includes("older than")) {
            year = filter.slice(11, 13);
            query = { "year": { $lt: 2021 - year } }
        }

        //If user enter a word "younger than" that means he wants movies younger than number of years he entered
        else if (filter.includes("younger than")) {
            year = filter.slice(13, 15);
            query = { "year": { $gt: 2021 - year } }
        }

        //If user enter a word "star" that means he wants search by rating
        else if (filter.includes("star")) {

            //If user enter words "more than" that means he wants movies with greatest rating than he entered
            if (filter.includes("more than")) {
                year = filter.slice(10, 11);
                query = { "ratingValue": { $gt: year } }
            }

            //If user enter words "less than" that means he wants movies with lower rating than he entered
            else if (filter.includes("less than")) {
                year = filter.slice(10, 11);
                query = { "ratingValue": { $lt: year } }
            }

            //If user enter words "at least" that means he wants movies with greatest or equal rating than he entered
            else if (filter.includes("at least")) {
                year = filter.slice(9, 10);
                query = { "ratingValue": { $gte: year } }
            }

            //If user enter number of stars that means he wants movies with exact stars
            else {
                year = filter.slice(0, 2);
                query = { "ratingValue": { $eq: year } }
            }
        }
        //User has enterr just a word
        else {
            query = { "title": { "$regex": filter, "$options": "i" } }
        }
    }

    try {
        Movie.find(query,
            function (err, docs) {
                return res.status(200).json({
                    movies: docs
                })
            }
        );
    } catch (err) {
        const error = new Error(
            'Fetching movies failed', 500
        );
        return next(error);
    }
}

exports.getMovies = getMovies;
exports.getShows = getShows;
exports.addRate = addRate;
exports.getSearchedMovies = getSearchedMovies;
