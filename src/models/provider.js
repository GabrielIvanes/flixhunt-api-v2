const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  logo_path: { type: String, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model('provider', providerSchema);
