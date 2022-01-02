const Movie = require('../models/movie.model');

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


exports.getSearchedMovies = getSearchedMovies;