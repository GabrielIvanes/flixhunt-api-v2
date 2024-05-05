const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  backDropPath: { type: String },
  credits: {
    cast: [{ id: { type: String, ref: 'cast' } }],
    crew: [{ id: { type: String, ref: 'crew' } }],
  },
  genres: [{ id: { type: Number, ref: 'genre' } }],
  TMDBId: { type: Number, required: true },
  overview: { type: String },
  posterPath: { type: String },
  recommendations: [{ id: { type: String, ref: 'movie' } }],
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
  providers: [{ id: { type: String, ref: 'provider' } }],
  directors: [{ id: { type: String, ref: 'crew' } }],
  createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('movie', movieSchema);
