const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Controllers
const helperRouter = require('./controllers/helper')


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

// Routes

app.use('/helpers', helperRouter)

app.listen(3000, () => {
    console.log('The express app is ready!');
});
