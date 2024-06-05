const mongoose = require('mongoose');
const moment = require('moment');

const TVShowSchema = new mongoose.Schema({
  backDropPath: { type: String },
  credits: {
    cast: [{ id: { type: Number, ref: 'cast' } }],
    crew: [{ id: { type: Number, ref: 'crew' } }],
  },
  genres: [{ id: { type: Number, ref: 'genre' } }],
  TMDBId: { type: Number, required: true },
  overview: { type: String },
  posterPath: { type: String },
  recommendations: [{ id: { type: Number, ref: 'tv' } }],
  firstDate: { type: String },
  lastDate: { type: String },
  tagline: { type: String },
  name: { type: String },
  voteAverage: { type: Number },
  numberEpisodes: { type: Number },
  numberSeasons: { type: Number },
  video: {
    name: { type: String },
    key: { type: String },
    site: { type: String },
    type: { type: String },
    official: { type: Boolean },
  },
  providers: [{ id: { type: Number, ref: 'provider' } }],
  creators: [{ id: { type: Number, ref: 'crew' } }],
  createdAt: { type: String, default: moment().format(), required: true },
});

module.exports = mongoose.model('tv', TVShowSchema);
