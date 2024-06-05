const mongoose = require('mongoose');
const moment = require('moment');

const commentSchema = mongoose.Schema({
  userId: { type: String, required: true, ref: 'user' },
  elementId: { type: Number, required: true },
  comment: { type: String, required: true },
  elementModel: {
    type: String,
    required: true,
    enum: ['movie', 'tv', 'episode', 'season'],
  },
  date: {
    type: String,
    default: moment().format(),
    required: true,
  },
});

module.exports = mongoose.model('comment', commentSchema);
