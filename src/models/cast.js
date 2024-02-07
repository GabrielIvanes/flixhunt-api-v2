const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  TMDBId: { type: Number, required: true },
  gender: { type: Number },
  know_for_department: { type: String },
  name: {type: String, required: true},
	profile_path: {type: String},
	character: string;
	credit_id: string;
	order: number;
});
