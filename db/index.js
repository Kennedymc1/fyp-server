const mongoose = require('mongoose');

exports.connect = () => {
    const dbUrl = process.env.MONGODB_URI;
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('error', (err) => console.log(err));
    mongoose.connection.on('connected', () => console.log("MongoDb Connected!"));
    mongoose.connection.on('disconnected', () => console.log("MongoDb Disconnected"));
}