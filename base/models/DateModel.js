const mongoose = require('mongoose');

const schema = mongoose.Schema({
    data: String,
    

})

const model = mongoose.model('date', schema);

module.exports = model;
