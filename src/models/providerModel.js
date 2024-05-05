const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  logoPath: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('provider', providerSchema);
