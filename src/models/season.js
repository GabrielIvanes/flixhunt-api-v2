const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
  credits: {
    cast: [{ id: { type: Number, ref: 'cast' } }],
    crew: [{ id: { type: Number, ref: 'crew' } }],
  },
  TMDBId: { type: Number, required: true },
  TMDBTvId: { type: Number, required: true },
  overview: { type: String },
  posterPath: { type: String },
  date: { type: String },
  season_number: { type: Number },
  name: { type: String },
  video: {
    name: { type: String },
    key: { type: String },
    site: { type: String },
    type: { type: String },
    official: { type: Boolean },
  },
  providers: [{ id: { type: Number, ref: 'provider' } }],
});

module.exports = mongoose.model('season', seasonSchema);
