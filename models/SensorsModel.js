const mongoose = require('mongoose');

const schema = mongoose.Schema({
    date: String,
    time: String,
    temperature: String,
    humidity: String

})

const model = mongoose.model('sensors', schema);

module.exports = model;
