const router = require('express').Router();
const searchControllers = require('../../controllers/TMDB/search');
const auth = require('../../middleware/auth');

router.post('/search', auth, searchControllers.search);

module.exports = router;
