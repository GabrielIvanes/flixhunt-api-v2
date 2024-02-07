const router = require('express').Router();
const personsControllers = require('../../controllers/TMDB/persons');
const auth = require('../../middleware/auth');

router.get('/:id', auth, personsControllers.getDetails);

module.exports = router;
