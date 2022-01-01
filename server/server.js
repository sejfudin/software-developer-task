const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
const db = require('./config/db');

dotenv.config();

//Connect to database
db();

//Create express app
const app = express();

app.use(cors());

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});