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
    },
    //  ratedBy: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User'
    // }],
    rating: [],
    ratingValue:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Movie', movieSchema);