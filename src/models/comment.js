const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  userId: { type: Number, required: true, ref: 'user' },
  elementId: { type: Number, required: true },
  comment: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model('comment', commentSchema);
