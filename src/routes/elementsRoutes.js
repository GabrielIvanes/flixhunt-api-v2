const router = require('express').Router();
const auth = require('../middleware/auth');
const elementsController = require('../controllers/elements');

router.post('/movies/add', elementsController.addMovie);
router.get('/movies/:id', elementsController.getMovie);
router.post('/tv-show/add', elementsController.addTvShow);
router.get('/tv-show/:id', elementsController.getTvShow);
router.post('/season/add', elementsController.addSeason);
router.get('/season/:id', elementsController.getSeason);
router.post('/episode/add', elementsController.addEpisode);
router.get('/episode/:id', elementsController.getEpisode);
router.post('/genre/add', elementsController.addGenre);
router.get('/genre/:id', elementsController.getGenre);
router.post('/provider/add', elementsController.addProvider);
router.get('/provider/:id', elementsController.getProvider);
router.post('/person/add', elementsController.addPerson);
router.get('/person/:id', elementsController.getPerson);

module.exports = router;
