const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    department: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Course", courseSchema);