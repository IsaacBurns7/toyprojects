require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courses');

const app = express();

app.use(express.json());

//i like doing this for logging purposes
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//use routes
app.use("/api/courses", courseRoutes);


mongoose.connect(process.env.MONGO_ATLAS_URI)
    .then(() => {
        console.log("connected to DATABASE!!")
        app.listen(process.env.PORT, () => {
            console.log("listening for requests on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    });