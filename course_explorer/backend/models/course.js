/*
    COURSE SCHEMA

    {
        info: {courseId, averageGPA, totalSections, totalStudents, averageRating, totalRatings}
        professors: [
            "professorName1",
            "professorName2",
            "professorName3"
        ]
    }
    
    OR 
    
    {
        info: {infoObj},
        professors: [
            "professorID1",
            "professorID2"
        ]
    }

    note: may need to extend to preqrequisite classes and postrequisite classes (what classes need this class)
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    info: {
        averageGPA: Number,
        totalSections: Number,
        totalStudents: Number,
        averageRating: Number,
        totalRatings: Number
    },
    professors: [
        String
    ]
});