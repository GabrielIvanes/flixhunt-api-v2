const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === 'movie' || value === 'tv';
      },
    },
  },
});

module.exports = mongoose.model('genre', genreSchema);
