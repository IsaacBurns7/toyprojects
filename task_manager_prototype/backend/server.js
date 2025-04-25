require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const tasksRouter = require('./routes/tasks.js');

const app = express();

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/', tasksRouter);

mongoose.connect(process.env.MONGO_ATLAS_URI)
    .then(() => {
        console.log("connected to DB")
    })
    .catch((error) => {
        console.log("error while connecting to DB", error);
    });

app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
});