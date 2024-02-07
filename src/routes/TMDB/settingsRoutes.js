const router = require('express').Router();
const settingsControllers = require('../../controllers/TMDB/settings');

router.get('/baseUrl', settingsControllers.getBaseUrl);

module.exports = router;
