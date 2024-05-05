const router = require('express').Router();
const auth = require('../middleware/auth');
const actionsController = require('../controllers/actions');

router.post('/add', actionsController.createList);
router.get(
  '/userId/:userId/name/:name',
  actionsController.getListByNameAndUserId
);
router.get('/userId/:userId', actionsController.getUserLists);
router.get(
  '/:id/elements/model/:elementModel',
  actionsController.getListElementsByElementModel
);
router.get(
  '/:id/elements/:TMDBId/model/:elementModel/isInList',
  actionsController.isElementInList
);

router.post('/:id/elements/add', actionsController.addElementToList);
router.get('/:id/elements', actionsController.getListElements);
router.get('/:id', actionsController.getListById);

module.exports = router;
