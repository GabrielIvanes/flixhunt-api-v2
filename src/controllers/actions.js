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
        .then((list) => {
          return res
            .status(201)
            .json({ list: list, message: 'list has been added.' });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    } catch (err) {
      return res.status(500).json(err);
    }
  } else return res.status(404).json('Missing userId or list name.');
};

const deleteList = async (req, res) => {
  const { id } = req.params;
  const enumDefaultListsName = ['Like', 'Watchlist', 'Seen', 'TheaterSeen'];

  try {
    if (!id) return res.status(404).json('Missing id.');

    const list = await listModel.findOne({ _id: id });

    if (!list) return res.status(400).json("The list given doesn't exist.");

    if (enumDefaultListsName.includes(list.name))
      return res.status(400).json("You can't delete a default list.");

    const isElementsDeleted = await deleteElementsFromList(id);

    if (!isElementsDeleted)
      return res.status(400).json("Elements couldn't be deleted.");
    listModel
      .deleteOne({
        _id: id,
      })
      .then(() => {
        return res.status(200).json(`The list has been deleted`);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};

async function deleteElementsFromList(listId) {
  try {
    const firstElementInList = await elementInListModel.findOne({
      listId: listId,
    });

    if (!firstElementInList) return true;

    await elementInListModel.deleteMany({ listId: listId });
    return true;
  } catch {
    return false;
  }
}

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

const getListElementsInfo = async (req, res) => {
  const listId = req.params.id;

  if (!listId) return res.status(404).json('Missing listId.');

  try {
    const elements = await elementInListModel.find({ listId: listId });
    const elementsInfo = [];
    for (const element of elements) {
      let elementInfo;
      switch (element.elementModel) {
        case 'movie':
          elementInfo = await movieModel
            .findOne({ TMDBId: element.elementId })
            .lean();
          break;
        case 'tv':
          elementInfo = await tvShowModel
            .findOne({
              TMDBId: element.elementId,
            })
            .lean();
          break;
        case 'season':
          elementInfo = await seasonModel
            .findOne({
              TMDBId: element.elementId,
            })
            .lean();
          break;
        case 'episode':
          elementInfo = await episodeModel
            .findOne({
              TMDBId: element.elementId,
            })
            .lean();
          break;
      }
      const newELementInfo = { ...elementInfo, media: element.elementModel };
      elementsInfo.push(newELementInfo);
    }
    return res.status(200).json(elementsInfo);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getListElementsInfoPerPagesFilters = async (req, res) => {
  const listId = req.params.id;
  const page = req.params.page;
  const filters = req.body.filters;

  if (!listId) return res.status(404).json('Missing listId.');

  try {
    const elements = await elementInListModel.find({ listId: listId });

    const filteredElements = [];
    let media = [];

    if (filters.media.length === 0) {
      media = ['movie', 'tv', 'season'];
    } else {
      media = filters.media.map((m) => m.devString);
    }

    const mediaSet = new Set(elements.map((element) => element.elementModel));
    const uniqueMediaList = Array.from(mediaSet);

    for (const element of elements) {
      if (media.includes(element.elementModel)) filteredElements.push(element);
    }

    const elementsInfo = [];

    let start = 18 * (page - 1);
    let end = Math.min(start + 18, filteredElements.length);

    for (let i = start; i < end; i++) {
      let elementInfo;
      switch (filteredElements[i].elementModel) {
        case 'movie':
          elementInfo = await movieModel
            .findOne({ TMDBId: filteredElements[i].elementId })
            .lean();
          break;
        case 'tv':
          elementInfo = await tvShowModel
            .findOne({
              TMDBId: filteredElements[i].elementId,
            })
            .lean();
          break;
        case 'season':
          elementInfo = await seasonModel
            .findOne({
              TMDBId: filteredElements[i].elementId,
            })
            .lean();
          break;
        case 'episode':
          elementInfo = await episodeModel
            .findOne({
              TMDBId: filteredElements[i].elementId,
            })
            .lean();
          break;
      }
      const newELementInfo = {
        ...elementInfo,
        media: filteredElements[i].elementModel,
      };
      elementsInfo.push(newELementInfo);
    }
    console.log(Math.floor(filteredElements.length / 18));
    return res.status(200).json({
      media: uniqueMediaList,
      totalResults: filteredElements.length,
      totalPages:
        filteredElements.length % 18 === 0
          ? Math.floor(filteredElements.length / 18)
          : Math.floor(filteredElements.length / 18) + 1,
      elements: elementsInfo,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
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

      if (elements.some((element) => element.elementId === TMDBId))
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
    if (elementInList)
      return res
        .status(200)
        .json({ include: true, date: elementInList.dateAdded });
    else return res.status(200).json({ include: false });
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

const removeElementFromList = async (req, res) => {
  const { id, elementModel, TMDBId } = req.params;

  const enumElementModel = ['movie', 'tv', 'episode', 'season'];

  if (
    !(id && TMDBId && elementModel && enumElementModel.includes(elementModel))
  )
    return res
      .status(404)
      .json(
        'Missing listId or TMDBId or elementModel or elementModel is not allowed.'
      );

  const elementInList = elementInListModel.findOne({
    listId: id,
    elementId: TMDBId,
    elementModel: elementModel,
  });

  if (!elementInList) return res.status(404).json('Element is not in list.');

  elementInListModel
    .deleteOne({
      listId: id,
      elementId: TMDBId,
      elementModel: elementModel,
    })
    .then(() => {
      return res
        .status(200)
        .json(`Element ${elementModel} of id ${TMDBId} has been deleted.`);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const updateListName = async (req, res) => {
  const listId = req.params.id;
  const newName = req.params.newName;

  if (!(listId && newName))
    return res.status(404).json('Missing listId or new name.');
  listModel
    .findOneAndUpdate({ _id: listId }, { name: newName })
    .then(() => {
      return res.status(200).json('List name has been updated.');
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
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
  removeElementFromList,
  deleteList,
  getListElementsInfo,
  getListElementsInfoPerPagesFilters,
  updateListName,
};
