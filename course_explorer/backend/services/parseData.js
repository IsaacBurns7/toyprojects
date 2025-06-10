const Course = require("../models/course");
const Department = require("../models/department");
const Professor = require("../models/professor");

const { getAnexData,
    getProfessorId,
    getDepartmentCourses,
    getDegreePlan } = require("./fetchData");
const cheerio = require("cheerio");


//later update ratings aswell    
async function populateProfessors(dept, number){
    const professorMap = await getAnexData(dept, number);
    let selectedCourse = await Course.findOne({"info.department": dept, "info.number": number});
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

    let newSections = selectedCourse.sections;
    let newProfessors = selectedCourse.professors;

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
            for(section2Obj of sections){
                if(section2Obj.dept === dept && section2Obj.courseNumber === number){
                    const existingSection = selectedCourse.sections.find((section1Obj) => {
                        section1Obj.section === section2Obj.section
                    });
                    if(existingSection){
                        continue;
                    }
                }
                const { sectionDept, sectionNumber, ...rest} = section2Obj;

                newSections.push({
                    ...rest
                });

                console.log(section2Obj);
                //section2Obj has {A, B, C, D, F, I, S, U, Q, X} biut not totalStudents, averageGPA
                //thats causing NaN

                newTotalGPA += Number(section2Obj.averageGPA) * Number(section2Obj.totalStudents); 
                newTotalStudents += Number(section2Obj.totalStudents);
                newTotalSections += 1;
            };

            console.log(newTotalGPA);
            console.log(newTotalStudents);
            console.log(newTotalSections);

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
            if(!newProfessors.find(key => key = professorKey)){
                newProfessors.push(professorKey);
            }

            await selectedProfessor.save();
        }else{
            const newProfessor = await Professor.create({info, courses: [courseKey]});
        }
    });

    const courseId = selectedCourse._id;
    // console.log(newSections);

    await selectedCourse.updateOne(
        {
            _id: courseId
        },
        { sections: newSections, professors: newProfessors}
    );
    console.log("populating professors finished!");

    return selectedCourse;
}

async function populateCourses(deptRaw) {
    const dept = deptRaw.toLowerCase();
    let courses = Course.find({"info.department": dept.toUpperCase()}); 
    const message = [];

    const response = await fetch(`https://catalog.tamu.edu/undergraduate/course-descriptions/${dept}/`, {
            method: "GET"
        })
    const html = await response.text();
    const $ = cheerio.load(html);
    const elements = $(".courseblock").toArray();

    if(elements.length === 0){
        return { error: `Department ${dept} not found or has no course listings.`};
    }

    for(const element of elements){
        const title = $(element).find('.courseblocktitle');
        const desc = $(element).find(".courseblockdesc");

        const number = title.text().slice(5,8);
        const courseTitle = title.text().slice(9);
        const description = desc.text();

        const info = {
            department: dept.toUpperCase(),
            number,
            title: courseTitle,
            description,
            averageGPA: 4.00,
            totalSections: 0,
            totalStudents: 0,
            averageRating: 5.00,
            totalRatings: 0
        }

        const existingCourse = await Course.findOne({"info.department": dept.toUpperCase(), "info.number": number});

        if(existingCourse){
            continue;
        }

        try{   
            const course = await Course.create({info, professors: [], sections: []});
            message.push(course);
        }catch(error){
            message.push(error);
        }
    }
    courses = message;
    // console.log(message);
    console.log("parsing courses finished!");

    return courses;
}

async function populateDepartments() {

}

module.exports = { populateProfessors, 
    populateCourses, 
    populateDepartments    
}