const axios = require('axios');

const Movie = require('../models/movie.model');

const connectToDatabase = require('./seed.connect');

//Connection to data base
connectToDatabase();

const pushDataToDb = async () => {
    await Movie.deleteMany({})

    //Fetch movies from external API
    const resMovies = await axios.get(process.env.MOVIES_BASE_URL + process.env.API_KEY);
    let movies = resMovies.data.items.slice(0, 30);

    //Fetch shows from external API
    const resShows = await axios.get(process.env.SHOWS_BASE_URL + process.env.API_KEY);
    let shows = resShows.data.items.slice(0, 30);

    //Seed movies
    for (let i = 0; i < movies.length; i++) {

        // const rating = parseInt(movies[i].imDBRating);

        const newMovie = new Movie({
            title: movies[i].title,
            crew: movies[i].crew,
            year: parseInt(movies[i].year),
            image: movies[i].image,
            isMovie: true,
            rating: parseInt(shows[i].imDbRating / 3),
            ratingValue: parseInt(movies[i].imDbRating / 3)
        });
        await newMovie.save();
    }

    //Seed shows
    for (let i = 0; i < shows.length; i++) {
        const newShow = new Movie({
            title: shows[i].title,
            crew: shows[i].crew,
            year: parseInt(shows[i].year),
            image: shows[i].image,
            isMovie: false,
            rating: parseInt(shows[i].imDbRating / 3),
            ratingValue: parseInt(shows[i].imDbRating / 3)
        });
        await newShow.save();
    }

    //Kill process
    process.exit();
}

pushDataToDb();

module.exports = pushDataToDb;
