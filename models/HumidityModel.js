const mongoose = require('mongoose');

const schema = mongoose.Schema({
    data: String,
    

})

const model = mongoose.model('humidity', schema);

module.exports = model;
