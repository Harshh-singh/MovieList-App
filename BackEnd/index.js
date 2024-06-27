const cors = require("cors");
require('dotenv').config();

const express = require('express');
const db = require('./config/mongoose');
const cors = require('cors');
const movieRouter = require('./routes/movies');
const port = process.env.Port;

const app = express();

const corsOptions = {
origin:'https://movie-list-app-frontend-ashy.vercel.app',
methods:'GET,PUT,DELETE,POST',
credentials: true,
optionsSuccessStatus:204,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/movies',movieRouter);


app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
})
