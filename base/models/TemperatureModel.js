const mongoose = require('mongoose');

const schema = mongoose.Schema({
    data: String,
    

})

const model = mongoose.model('temperature', schema);

module.exports = model;
