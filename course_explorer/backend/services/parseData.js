const Course = require("../models/course");
const Department = require("../models/department");
const professor = require("../models/professor");
const Professor = require("../models/professor");

const { getAnexData,
    getProfessorId,
    getDepartmentCourses,
    getDegreePlan } = require("./fetchData");


//later update ratings aswell    
async function populateProfessors(dept, number){
    const professorMap = await getAnexData(dept, number);
    Object.entries(professorMap).forEach(async (entry) => {
        const name = entry[0];
        const {info, sections} = entry[1];
        const selectedProfessor = await Professor.findOne({"info.name": name });

        if(selectedProfessor){
            let newTotalGPA = selectedProfessor.info.averageGPA * selectedProfessor.info.totalStudents; //+ info.averageGPA * info.totalStudents
            let newTotalStudents = selectedProfessor.info.totalStudents;// + info.totalStudents;
            let addedSections = 0;

            //find duplicates
            console.log(selectedProfessor);
            selectedProfessor.sections.forEach((section1) => {
                sections.forEach((section2) => {
                    const key1 = section1.dept + section1.courseNumber + section1.sectionNumber;
                    const key2 = section2.dept + section2.courseNumber + section2.sectionNumber;
                    if(key1 === key2){
                        return;
                    }
                    const { number, section, ...rest} = section2;

                    selectedProfessor.sections.push({
                        ...rest,
                        courseNumber: number,
                        sectionNumber: number
                    });
                    newTotalGPA += section.averageGPA * section.totalStudents; 
                    newTotalStudents += section.totalStudents;
                    addedSections += 1;
                });
            });

            selectedProfessor.info = { 
                ...selectedProfessor.info, 
                averageGPA: (newTotalGPA / newTotalStudents),
                totalStudents: newTotalStudents, 
                totalSections: selectedProfessor.totalSections + addedSections.length
            };

            await selectedProfessor.save();
        }else{
            const newProfessor = await Professor.create({info, sections});
        }
    });
}

populateProfessors("CSCE",120);

async function populateCourses() {

}

async function populateDepartments() {

}

module.exports = { populateProfessors, 
    populateCourses, 
    populateDepartments    
}