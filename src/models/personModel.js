const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  TMDBId: { type: Number, required: true },
  gender: { type: Number },
  knowForDepartment: { type: String },
  name: { type: String, required: true },
  profilePath: { type: String },
  biography: { type: String },
  createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('person', personSchema);
