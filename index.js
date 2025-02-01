require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(express.json());

const user = require('./routes/user');
app.use('/api/user', user)

app.use(express.json());

app.listen(80, () => {
    console.log(`Server Started at ${80}`)
})