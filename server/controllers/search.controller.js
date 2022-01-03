const Movie = require('../models/movie.model');

//Searching
const getSearchedMovies = async (req, res, next) => {

    const { term, skip, limit, isMovie } = req.body;
    let isNumber;

    //Checking if a user has entered a number
    isNumber = parseInt(term);

    //If number is entered, user wants search by year
    let query = {};
    if (!isNaN(isNumber) && isNumber > 9) {
        query = { "year": isNumber, "isMovie": isMovie }
    }

    //Cases is a user did not enter a number
    else {
        let year;

        //If user enter a word "star" that means he wants search by rating
        if (term.includes("star")) {

            //If user enter words "more than" that means he wants movies with greatest rating than he entered
            if (term.includes("more than")) {
                year = term.slice(10, 11);
                query = { "ratingValue": { $gt: year }, "isMovie": isMovie }
            }

            //If user enter words "less than" that means he wants movies with lower rating than he entered
            else if (term.includes("less than")) {
                year = term.slice(10, 11);
                query = { "ratingValue": { $lt: year }, "isMovie": isMovie }
            }

            //If user enter words "at least" that means he wants movies with greatest or equal rating than he entered
            else if (term.includes("at least")) {
                year = term.slice(9, 10);
                query = { "ratingValue": { $gte: year }, "isMovie": isMovie }
            }

            //If user enter number of stars that means he wants movies with exact stars
            else {
                year = term.slice(0, 2);
                query = { "ratingValue": { $eq: year }, "isMovie": isMovie }
            }
        } else {
            //If user enter a word "after" that means he wants a results after entered year
            if (term.includes("after")) {
                year = term.slice(5);
                query = { "year": { $gt: year }, "isMovie": isMovie }
            }

            //If user enter a word "before" that means he wants a results before entered year
            else if (term.includes("before")) {
                year = term.slice(6);
                query = { "year": { $lt: year }, "isMovie": isMovie }
            }

            //If user enter a word "older than" that means he wants movies older than number of years he entered
            else if (term.includes("older than")) {
                year = term.slice(11, 13);
                query = { "year": { $lt: 2021 - year }, "isMovie": isMovie }
            }

            //If user enter a word "younger than" that means he wants movies younger than number of years he entered
            else if (term.includes("younger than")) {
                year = term.slice(13, 15);
                query = { "year": { $gt: 2021 - year }, "isMovie": isMovie }
            }

            //User has enterr just a word
            else {
                query = { $or: [{ "title": { "$regex": term, "$options": "i" } }, { "crew": { "$regex": term, "$options": "i" } }], "isMovie": isMovie }
            }
        }
    }


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