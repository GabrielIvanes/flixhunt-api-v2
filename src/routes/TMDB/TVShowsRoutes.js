const router = require('express').Router();
const TVControllers = require('../../controllers/TMDB/TVShows');
const auth = require('../../middleware/auth');

router.get('/genres', auth, TVControllers.getGenres);
router.get('/genres/:id', auth, TVControllers.getTvShowsByGenre);
router.get('/trending', auth, TVControllers.getTrending);
router.get('/:id/seasons/:nbSeason', auth, TVControllers.getSeasonDetails);
router.get(
  '/:id/seasons/:nbSeason/episodes/:nbEpisode',
  auth,
  TVControllers.getEpisodeDetails
);
router.post('/top-rated', auth, TVControllers.getTopRated);
router.get('/:id', auth, TVControllers.getDetails);

module.exports = router;
