/*
    PROFESSOR SCHEMA 
    {
        info: { profId(can this override _id), name, averageGPA, totalSections, totalStudents, averageRating, totalRatings, etc},
        sections: [{section1}, {section2}, etc],
        ratings: [{rating1}, {rating2}, etc]
        }
    }

    or perhaps 
    {
        info: {infoObj},
        courses: [
            {
                courseId (based on dept and name),
                sections: [{section1}, {section2}],
                ratings: [{rating1}]
            }
        ]
    }

    note: there also will be a way to grab a professor in respect to just one class - because some professor teach one class better than others
*/
/*
    DEPTARTMENT SCHEMA

    [
        {courseNumber, courseTitle, courseDescription, courseId}        
    ]

    note: no need for department id b/c the name is guaranteed to be unique, and its automatically sorted alphabetically
*/
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


/*
returns map of professors: {dept, number, gpa, etc, number of sections, etc}
*/
async function getAnexData(department, number){
    const params = new URLSearchParams();
    params.append("dept", department);
    params.append("number", number);

    const response = await fetch("https://anex.us/grades/getData/?", {
        method: "POST",
        body: params,
        headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0"
        }
    })
    if(!response.ok){
        throw new Error(`Failed to fetch data for ${dept} ${number}`);
    }
    let anex_data;
    try {
        const rawText = await response.text();
        anex_data = JSON.parse(rawText);
    } catch (error) {
        throw new Error(`Failed to parse JSON for ${dept} ${number}: ${error.message}`);
        // console.log("Bad response text:", rawText);
    }

    if (!anex_data || !anex_data.classes || anex_data.classes.length === 0) {
        throw new Error(`No data found for ${dept} ${number}`);
    }

    const professors = new Map();

    for(const section of anex_data.classes){
        const name = section.prof;
        const obj = professors[name];
        
        let totalStudents = 0;
        const filters = ["A", "B", "C", "D", "F", "I", "Q", "S", "U", "X"];

        for(const filter of filters){
            totalStudents += Number(section.filter);
        }

        if(!obj){
            professors[name] = {
                info: {
                    name: section.prof.name,
                    averageGPA: gpa,
                    totalSections: 1,
                    totalStudents,
                },
                sections: [
                    { ...section}
                ]
            };
        }else{
            const { info, sections } = obj;
            info.totalSections += 1;
            const totalGPA = info.averageGPA * info.totalStudents + section.gpa * totalStudents;
            info.totalStudents += totalStudents;
            info.averageGPA = totalGPA / info.totalStudents;
            sections.push(section);
            professors[name] = {
                info,
                sections
            }
        }
    }

    return professors;
    
}

function getRMPData(){

}

function getDepartmentCourses(){

}

function getDegreePlan(){

}