const mongoose = require('mongoose');
const moment = require('moment');

const episodeSchema = new mongoose.Schema({
  credits: {
    cast: [{ id: { type: Number, ref: 'cast' } }],
    crew: [{ id: { type: Number, ref: 'crew' } }],
  },
  TMDBId: { type: Number, required: true },
  TMDBTvId: { type: Number, required: true },
  nbSeason: { type: Number, required: true },
  overview: { type: String },
  posterPath: { type: String },
  date: { type: String },
  runtime: { type: String },
  episodeNumber: { type: Number },
  name: { type: String },
  video: {
    name: { type: String },
    key: { type: String },
    site: { type: String },
    type: { type: String },
    official: { type: Boolean },
  },
  images: [
    {
      path: { type: String },
    },
  ],
  createdAt: { type: String, default: moment().format(), required: true },
});

module.exports = mongoose.model('episode', episodeSchema);
