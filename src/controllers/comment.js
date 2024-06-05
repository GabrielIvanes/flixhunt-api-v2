const commentModel = require('../models/commentModel');
const moment = require('moment');

function getLocalTime() {
  const date = moment().format();
  return date;
}

const addComment = async (req, res) => {
  const { userId, TMDBId, elementModel, comment } = req.body;
  const enumElementModel = ['movie', 'tv', 'episode', 'season'];

  if (
    !(
      userId &&
      TMDBId &&
      comment &&
      comment !== '' &&
      elementModel &&
      enumElementModel.includes(elementModel)
    )
  )
    return res
      .status(404)
      .json(
        'Missing userId or TMDBId or comment or elementModel or elementModel is not allowed or comment is empty.'
      );

  try {
    const commentDB = await commentModel.findOne({
      userId: userId,
      elementId: TMDBId,
      elementModel: elementModel,
    });

    if (commentDB)
      return res
        .status(400)
        .json('User already have a comment on this element');

    const newComment = new commentModel({
      userId: userId,
      elementId: TMDBId,
      comment: comment,
      elementModel: elementModel,
      date: getLocalTime(),
    });

    newComment
      .save()
      .then((comment) => {
        return res
          .status(201)
          .json({ comment: comment, message: 'Comment has been created.' });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getComment = async (req, res) => {
  const { userId, elementModel, TMDBId } = req.params;
  const enumElementModel = ['movie', 'tv', 'episode', 'season'];

  if (
    !(
      userId &&
      TMDBId &&
      elementModel &&
      enumElementModel.includes(elementModel)
    )
  )
    return res
      .status(404)
      .json(
        'Missing userId or TMDBId or elementModel or elementModel is not allowed.'
      );

  try {
    const commentDB = await commentModel.findOne({
      userId: userId,
      elementId: TMDBId,
      elementModel: elementModel,
    });

    if (commentDB)
      return res.status(200).json({ comment: commentDB, success: true });
    else
      return res.status(400).json({
        message: "This user doesn't have a comment on this element.",
        success: false,
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getCommentById = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).json('Missing commentId.');

  try {
    const commentDB = await commentModel.findOne({ _id: id });

    if (commentDB) return res.status(200).json(commentDB);
    else
      return res
        .status(400)
        .json("This user doesn't have a comment on this element.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateComment = async (req, res) => {
  const { userId, TMDBId, elementModel, comment } = req.body;
  const enumElementModel = ['movie', 'tv', 'episode', 'season'];

  if (
    !(
      userId &&
      TMDBId &&
      elementModel &&
      enumElementModel.includes(elementModel)
    )
  )
    return res
      .status(404)
      .json(
        'Missing userId or TMDBId or comment or elementModel or elementModel is not allowed.'
      );

  try {
    const commentDB = await commentModel.findOne({
      userId: userId,
      elementId: TMDBId,
      elementModel: elementModel,
    });

    if (!commentDB)
      return res
        .status(400)
        .json("User doesn't have any comment yet on this element.");

    if (comment !== '') {
      commentModel
        .findOneAndUpdate(
          {
            userId: userId,
            elementId: TMDBId,
            elementModel: elementModel,
          },
          {
            comment: comment,
            date: getLocalTime(),
          }
        )
        .then((comment) => {
          return res
            .status(204)
            .json({ comment: comment, message: 'Comment has been updated' });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    } else {
      commentModel
        .deleteOne({
          userId: userId,
          elementId: TMDBId,
          elementModel: elementModel,
        })
        .then(() => {
          return res.status(200).json(`Comment has been deleted.`);
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  addComment,
  getComment,
  getCommentById,
  updateComment,
};
