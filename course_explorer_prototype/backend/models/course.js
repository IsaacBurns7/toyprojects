const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
note on instructors: the attributes pertaining to each "instructor" in the courseSchema
are only the attributes for that specific course. Hence, they may appear multiple
times in the database if they teach multiple courses.
*/
const courseSchema = new Schema({
    department: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    professors: [String],
    sections: [String] //[SectionSchema]
});

module.exports = mongoose.model("Course", courseSchema);