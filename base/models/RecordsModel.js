const mongoose = require('mongoose');

const schema = mongoose.Schema({
    data: String,    
})

const model = mongoose.model('records', schema);

module.exports = model;
