const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const professorSchema = new Schema({
    name: String,
    sections: [{
        courseId: String,
        semester: String,
        gpa: Number,
    }],
    reviews: [{ //[ReviewSchema]
        rating: String
    }]
});

module.exports = mongoose.model("Professor", professorSchema);