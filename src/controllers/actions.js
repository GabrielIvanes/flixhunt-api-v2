const {
  list: listModel,
  elementInList: elementInListModel,
} = require('../models/listModel');
const movieModel = require('../models/movieModel');
const tvShowModel = require('../models/tv-showModel');
const seasonModel = require('../models/seasonModel');
const episodeModel = require('../models/episodeModel');

const createList = async (req, res) => {
  const { name, userId } = req.body;

  if (userId && name) {
    try {
      const userList = await listModel.findOne({ userId: userId, name: name });

      if (userList) {
        return res
          .status(404)
          .json('You already have a list with the same name.');
      }

      const newList = new listModel({ userId: userId, name: name });
      newList
        .save()
        .then(() => {
          return res.status(201).json('list has been added.');
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    } catch (err) {
      return res.status(500).json(err);
    }
  } else return res.status(404).json('Missing userId or list name.');
};

const getUserLists = async (req, res) => {
  const userId = req.params.userId;

  if (userId) {
    try {
      const userLists = await listModel.find({ userId: userId });
      if (userLists.length > 0) return res.status(200).json(userLists);
      else return res.status(204).json('No list found for this user.');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else return res.status(404).json('Missing userId.');
};

const getListByNameAndUserId = async (req, res) => {
  const userId = req.params.userId;
  const name = req.params.name;

  if (userId && name) {
    try {
      const userList = await listModel.findOne({ userId: userId, name: name });
      if (userList) return res.status(200).json(userList);
      else
        return res
          .status(204)
          .json(`The list ${name} of the user ${userId} doesn't exist.`);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else return res.status(404).json('Missing userId or list name.');
};

const getListById = async (req, res) => {
  const listId = req.params.id;

  if (listId) {
    try {
      const list = await listModel.findOne({ _id: listId });
      if (list) return res.status(200).json(list);
      else return res.status(204).json('No list found');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else return res.status(404).json('Missing listId.');
};

const getListElements = async (req, res) => {
  const listId = req.params.id;

  if (listId) {
    try {
      const elements = await elementInListModel.find({ listId: listId });
      if (elements.length > 0) return res.status(200).json(elements);
      else return res.status(204).json('No element for this list.');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else return res.status(404).json('Missing listId.');
};

const addElementToList = async (req, res) => {
  const listId = req.params.id;
  const TMDBId = req.body.elementId;
  const elementModel = req.body.elementModel;

  const enumElementModel = ['movie', 'tv', 'episode', 'season'];

  if (
    listId &&
    TMDBId &&
    elementModel &&
    enumElementModel.includes(elementModel)
  ) {
    try {
      let element;
      switch (elementModel) {
        case 'movie':
          element = await movieModel.findOne({ TMDBId: TMDBId });
          break;
        case 'tv':
          element = await tvShowModel.findOne({ TMDBId: TMDBId });
          break;
        case 'season':
          element = await seasonModel.findOne({ TMDBId: TMDBId });
          break;
        case 'episode':
          element = await episodeModel.findOne({ TMDBId: TMDBId });
          break;
      }

      const list = await listModel.findOne({ _id: listId });

      if (!list) return res.status(404).json("List doesn't exist.");
      if (!element) return res.status(404).json("Element doesn't exist.");

      const elements = await elementInListModel.find({ listId: listId });

      if (elements.some((element) => element.id === TMDBId))
        return res
          .status(204)
          .json("Element already in this list or list doesn't exist yet.");

      const newElementInList = new elementInListModel({
        listId: listId,
        elementId: TMDBId,
        elementModel: elementModel,
      });
      newElementInList
        .save()
        .then(() => {
          return res.status(201).json('New element has been added.');
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    } catch (err) {
      return res.status(500).json(err);
    }
  } else
    return res
      .status(404)
      .json(
        'Missing listId or elementId or elementModel or elementModel is not allowed.'
      );
};

const isElementInList = async (req, res) => {
  const listId = req.params.id;
  const TMDBId = req.params.TMDBId;
  const elementModel = req.params.elementModel;
  const enumElementModel = ['movie', 'tv', 'episode', 'season'];

  if (
    !(
      listId &&
      TMDBId &&
      elementModel &&
      enumElementModel.includes(elementModel)
    )
  )
    return res
      .status(404)
      .json(
        'Missing listId or elementId or elementModel or elementModel is not allowed.'
      );

  try {
    const elementInList = await elementInListModel.findOne({
      listId: listId,
      elementId: TMDBId,
      elementModel: elementModel,
    });
    if (elementInList) return res.status(200).json(true);
    else return res.status(200).json(false);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getListElementsByElementModel = async (req, res) => {
  const listId = req.params.id;
  const elementModel = req.params.elementModel;
  const enumElementModel = ['movie', 'tv', 'episode', 'season'];

  if (!(listId && elementModel && enumElementModel.includes(elementModel)))
    return res
      .status(404)
      .json('Missing listId or elementModel or elementModel is not allowed.');

  try {
    const elements = await elementInListModel.find({
      listId: listId,
      elementModel: elementModel,
    });
    if (elements.length > 0) return res.status(200).json(elements);
    else
      return res.status(204).json('No element for this list and this model.');
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createList,
  getUserLists,
  getListByNameAndUserId,
  getListById,
  getListElements,
  addElementToList,
  isElementInList,
  getListElementsByElementModel,
};
