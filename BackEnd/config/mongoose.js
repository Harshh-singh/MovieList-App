require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.mongodb);

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'Error connecting to Mongodb'));

db.once('open', function(){
    console.log("connected to db :: Mongodb")
});


module.exports = db;