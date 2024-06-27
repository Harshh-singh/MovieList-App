const cors = require("cors");
require('dotenv').config();

const express = require('express');
const db = require('./config/mongoose');
const cors = require('cors');
const movieRouter = require('./routes/movies');
const port = process.env.Port;

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://movie-list-app-frontend-4z52zky7j-harshh-singhs-projects.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/movies',movieRouter);

app.get(()=>{
  console.log("backend running")
})

app.listen(port, ()=>{
    
    console.log(`App running on port ${port}`);
})
