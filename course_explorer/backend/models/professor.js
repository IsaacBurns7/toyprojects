const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const professorSchema = new Schema({
    info: {
        name: String, 
        averageGPA: Number,
        totalSections: Number,
        totalStudents: Number,
        //yearsTaught: Number,
        averageRating: Number,
        totalRatings: Number,    
    },
    courses: [  
        {
            courseId: String,
            sections: [
                {   
                    dept: String, //may not need
                    courseNumber: Number, // may not need
                    sectionNumber: Number,
                    A: Number,
                    B: Number,
                    C: Number,
                    D: Number,
                    F: Number,
                    I: Number,
                    S: Number,
                    U: Number,
                    Q: Number,
                    X: Number,
                    prof: String, //may not need
                    year: Number,
                    semester: String,
                    gpa: Number
                }
            ],
            // ratings: [
            //     {}
            // ]
        }
    ]
});

module.exports = mongoose.model("Professor", professorSchema);