require('dotenv').config();

const express = require('express');
const db = require('./config/mongoose');
const cors = require('cors');
const movieRouter = require('./routes/movies');
const port = process.env.Port;

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/movies',movieRouter);


app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
})