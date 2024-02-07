const router = require('express').Router();
const moviesControllers = require('../../controllers/TMDB/movies');
const auth = require('../../middleware/auth');

router.get('/genres', auth, moviesControllers.getGenres);
router.get('/in-theater', auth, moviesControllers.getMoviesInTheater);
router.get('/genres/:id', auth, moviesControllers.getMoviesByGenre);
router.get('/trending', auth, moviesControllers.getTrending);
router.post('/top-rated', auth, moviesControllers.getTopRated);
router.get('/:id', auth, moviesControllers.getDetails);

module.exports = router;
