const router = require('express').Router();
const authControllers = require('../controllers/user/auth');
const userControllers = require('../controllers/user/user');

router.post('/signup', authControllers.signUp);
router.post('/signin', authControllers.signIn);
router.get('/logout', authControllers.logout);
router.get('/getId', userControllers.getUserId);
router.get('/:id', userControllers.getUser);

module.exports = router;
