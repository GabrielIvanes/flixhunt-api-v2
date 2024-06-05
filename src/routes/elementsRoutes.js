const router = require('express').Router();
const auth = require('../middleware/auth');
const elementsController = require('../controllers/elements');

router.post('/movies/add', elementsController.addMovie);
router.get('/movies/:id', elementsController.getMovie);
router.post('/tv-shows/add', elementsController.addTvShow);
router.get('/tv-shows/:id', elementsController.getTvShow);
router.post('/seasons/add', elementsController.addSeason);
router.get('/seasons/:id', elementsController.getSeason);
router.post('/episodes/add', elementsController.addEpisode);
router.get('/episodes/:id', elementsController.getEpisode);
router.post('/genres/add', elementsController.addGenre);
router.get('/genres/:id', elementsController.getGenre);
router.post('/providers/add', elementsController.addProvider);
router.get('/providers/:id', elementsController.getProvider);
router.post('/persons/add', elementsController.addPerson);
router.get('/persons/:id', elementsController.getPerson);

module.exports = router;
