const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies.controller');

router.post('/movies', moviesController.getMovies);
router.post('/shows', moviesController.getShows);
router.put('/rate/:id', moviesController.addRate);



module.exports = router;