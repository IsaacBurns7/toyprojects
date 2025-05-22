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
    //array of objects professors version
    // professors : [{
    //     name: String,
    //     sections: [{
    //         number: String,
    //         semester: String,
    //         gpa: Number, //expand this later to include std dev, median, etc, 
    //     }],
    //     reviews: [{ //expand this later to include reviews, characteristics of the professor, etc
    //         rating: String
    //     }]
    // }]
    
    //keyed object version
    professors: {
        type: Map,
        of: new Schema({
            sections: [{
                number: String,
                semester: String,
                gpa: Number
            }],
            reviews: [{
                rating: String
            }]
        })
    }
});

module.exports = mongoose.model("Course", courseSchema);