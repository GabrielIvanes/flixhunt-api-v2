const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('user', userSchema);
