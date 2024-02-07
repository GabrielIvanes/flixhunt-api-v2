const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  userId: { type: Number, required: true, ref: 'user' },
  name: { type: String, required: true },
});

const elementInListSchema = new mongoose.Schema({
  listId: { type: Number, ref: 'list' },
  elementId: { type: Number, required: true, refPath: 'elementModel' },
  elementModel: {
    type: String,
    required: true,
    enum: ['movie', 'tv', 'episode', 'season'],
  },
  dateAdded: { type: Date, default: Date.now(), required: true },
});

const list = mongoose.model('list', listSchema);
const elementInList = mongoose.model('elementInList', elementInListSchema);

module.exports = {
  list,
  elementInList,
};
