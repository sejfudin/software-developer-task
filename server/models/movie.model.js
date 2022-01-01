const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create movie Schema
const movieSchema = new Schema({
    
    title: {
        type: String
    },
    crew: {
        type: String
    },
    year: {
        type: Number
    },
    image: {
        type: String
    },
    isMovie: {
        type: Boolean
    }
})

module.exports = mongoose.model('Movie', movieSchema);