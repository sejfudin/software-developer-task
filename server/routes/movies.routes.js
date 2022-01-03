const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies.controller');
const searchController = require('../controllers/search.controller');

router.post('/movies', moviesController.getMovies);
router.put('/rate/:id', moviesController.addRate);
router.post('/movies/find', searchController.getSearchedMovies);

module.exports = router;