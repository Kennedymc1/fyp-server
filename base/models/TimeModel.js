const mongoose = require('mongoose');

const schema = mongoose.Schema({
    data: String,
    

})

const model = mongoose.model('time', schema);

module.exports = model;
