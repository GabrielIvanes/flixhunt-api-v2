const mongoose = require('mongoose');
const moment = require('moment');

const movieSchema = new mongoose.Schema({
  backDropPath: { type: String },
  credits: {
    cast: [{ id: { type: Number, ref: 'cast' } }],
    crew: [{ id: { type: Number, ref: 'crew' } }],
  },
  genres: [{ id: { type: Number, ref: 'genre' } }],
  TMDBId: { type: Number, required: true },
  overview: { type: String },
  posterPath: { type: String },
  recommendations: [{ id: { type: Number, ref: 'movie' } }],
  date: { type: String },
  runtime: { type: Number },
  tagline: { type: String },
  title: { type: String, required: true },
  voteAverage: { type: Number },
  video: {
    name: { type: String },
    key: { type: String },
    site: { type: String },
    type: { type: String },
    official: { type: Boolean },
  },
  providers: [{ id: { type: Number, ref: 'provider' } }],
  directors: [{ id: { type: Number, ref: 'crew' } }],
  createdAt: { type: String, default: moment().format(), required: true },
});

module.exports = mongoose.model('movie', movieSchema);
