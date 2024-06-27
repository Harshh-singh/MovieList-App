const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/MovieList');

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'Error connecting to Mongodb'));

db.once('open', function(){
    console.log("connected to db :: Mongodb")
});

module.exports = db;