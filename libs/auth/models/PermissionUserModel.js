const mongoose = require('mongoose');

const schema = mongoose.Schema({
    masterEmail: String,
    email: String,
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: String,
    accessToken: String,
   // emailSent: Boolean,
    viewOnly: Boolean,
    signupToken : String
})

const model = mongoose.model('permission-user', schema);

module.exports = model;
