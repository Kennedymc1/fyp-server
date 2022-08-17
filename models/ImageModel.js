const mongoose = require('mongoose');

const schema = mongoose.Schema({
	name: String,
	data: String,
	contentType: String
});

const model = mongoose.model('real-time-images1', schema);

module.exports = model;
