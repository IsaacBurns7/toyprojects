const Course = require("../models/course");
const Department = require("../models/department");
const Professor = require("../models/professor");

const { getAnexData,
    getProfessorId,
    getDepartmentCourses,
    getDegreePlan } = require("./fetchData");


//later update ratings aswell    
async function populateProfessors(dept, number){
    const professorMap = await getAnexData(dept, number);
    let selectedCourse = await Course.find({department: dept, number});
    const courseKey = `${dept}${number}`;

    if(!selectedCourse){
        let professors = [];
        let sections = [];
        let info = {
            department: dept,
            number,
            averageGPA: 4.00,
            totalSections: 0,
            totalStudents: 0,
            averageRating: 5.00,
            totalRatings: 0
        }
        selectedCourse = await Course.create({info, professors, sections})
    }

    let newTotalGPACourse = selectedCourse.info.averageGPA * selectedCourse.info.totalStudents; 
    let newTotalStudentsCourse = selectedCourse.info.students;
    let newTotalSectionsCourse = 0;

    Object.entries(professorMap).forEach(async (entry) => {
        const name = entry[0];
        const {info, sections} = entry[1];
        const selectedProfessor = await Professor.findOne({"info.name": name });

        if(selectedProfessor){
            /*

            */

            let newTotalGPA = selectedProfessor.info.averageGPA * selectedProfessor.info.totalStudents; //+ info.averageGPA * info.totalStudents
            let newTotalStudents = selectedProfessor.info.totalStudents;// + info.totalStudents;
            let newTotalSections = selectedProfessor.info.totalSections;

            //find duplicates
            console.log(selectedProfessor);
            selectedCourse.sections.forEach((section1) => {
                sections.forEach((section2) => {
                    const key2 = section2.dept + section2.courseNumber + section2.sectionNumber;
                    if(section1.section === section2.section){
                        return;
                    }
                    const { dept, number, ...rest} = section2;

                    selectedCourse.sections.push({
                        ...rest
                    });
                    newTotalGPA += section2.averageGPA * section2.totalStudents; 
                    newTotalStudents += section2.totalStudents;
                    newTotalSections += 1;
                });
            });

            selectedProfessor.info = { 
                ...selectedProfessor.info, 
                averageGPA: (newTotalGPA / newTotalStudents),
                totalStudents: newTotalStudents, 
                totalSections: newTotalSections
            };
            newTotalGPACourse += newTotalGPA;
            newTotalStudentsCourse += newTotalStudents;
            newTotalSectionsCourse += newTotalSections;

            const professorKey = name;
            
            if(selectedProfessor.courses.filter((key) => key === courseKey).length === 0){
                selectedProfessor.courses.push(courseKey);
            }
            if(selectedCourse.professors.filter((key) => key === professorKey).length === 0){
                selectedCourse.professor.push(professorKey);
            }

            await selectedProfessor.save();
        }else{
            const newProfessor = await Professor.create({info, courses: [courseKey]});
        }
    });
    await selectedCourse.save();

    return selectedCourse;
}

async function populateCourses() {

}

async function populateDepartments() {

}

module.exports = { populateProfessors, 
    populateCourses, 
    populateDepartments    
}