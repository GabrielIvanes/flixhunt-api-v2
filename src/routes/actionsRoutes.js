const router = require('express').Router();
const auth = require('../middleware/auth');
const actionsController = require('../controllers/actions');

router.delete(
  '/:id/elements/remove/:elementModel/:TMDBId',
  auth,
  actionsController.removeElementFromList
);
router.post('/add', actionsController.createList);
router.delete('/:id', auth, actionsController.deleteList);
router.get(
  '/userId/:userId/name/:name',
  auth,
  actionsController.getListByNameAndUserId
);
router.get('/userId/:userId', auth, actionsController.getUserLists);
router.get(
  '/:id/elements/model/:elementModel',
  auth,
  actionsController.getListElementsByElementModel
);
router.post('/:id/elements/add', auth, actionsController.addElementToList);

router.get(
  '/:id/elements/:TMDBId/model/:elementModel/isInList',
  auth,
  actionsController.isElementInList
);
router.get('/:id/elements/info', auth, actionsController.getListElementsInfo);
router.get('/:id/elements', auth, actionsController.getListElements);
router.post(
  '/:id/page/:page',
  auth,
  actionsController.getListElementsInfoPerPagesFilters
);
router.get('/:id', auth, actionsController.getListById);
router.put('/:id/update/name/:newName', auth, actionsController.updateListName);

module.exports = router;
