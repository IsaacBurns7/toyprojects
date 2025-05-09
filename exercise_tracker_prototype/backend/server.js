require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
});

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_ATLAS_URI)
    .then(() => {
        console.log("connected to DB")
        app.listen(process.env.PORT, () => {
            console.log("listening for requests on port", process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })