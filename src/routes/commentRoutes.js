const router = require('express').Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/comment');

router.post('/add', auth, commentController.addComment);
router.get(
  '/user/:userId/:elementModel/:TMDBId',
  auth,
  commentController.getComment
);
router.put('/update', auth, commentController.updateComment);
router.get('/:id', auth, commentController.getCommentById);

module.exports = router;
