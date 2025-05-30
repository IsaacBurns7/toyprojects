const Course = require("../models/course");
const Professor = require("../models/professor");

const getProfessors = async (req, res) => {
    const { dept: deptRaw, number } = req.params;
    const dept = deptRaw.toLowerCase();

    //fetch shit from db, and if db not has, then fetch from anex
    let course = await Course.findOne({department: dept.toUpperCase(), number});
    let courseId = course._id;

    if(!course){
        return res.status(400).json({error: `Course ${dept} ${number} not found.`});
    }

    const params = new URLSearchParams();
    params.append("dept", dept.toUpperCase());
    params.append("number", number);
    const response = await fetch("https://anex.us/grades/getData/?", {
        method: "POST",
        body: params, 
        headers: {
            "User-Agent": "Mozilla/5.0 (X11: Linux x86_64; rv:128.0 Gecko/20100101 Firefox/128.0"
        }
    });

    if(!response.ok){
        return res.status(400).json(`Failed to fetch data for ${dept} ${number}`);
    }
    let anexData;
    try {
        const rawText = await response.text();
        anexData = JSON.parse(rawText);
    }catch (error){
        return res.status(400).json(`Failed to parse JSON for ${dept} ${number}: ${error.message}`);
    }

    if(!anexData || !anexData.classes || anexData.classes.length === 0){
        return res.status(400).json(`No data found for ${dept} ${number}`);
    }
    const professorsMap = {

    };

    for(const sectionObj of anexData.classes){
        const name = sectionObj.prof;
        const professorObj = professorsMap[name];
        if(professorObj){
            //add that shit
            const {section, semester, year, gpa} = sectionObj;
            professorsMap[name].sections.push({section, courseId, semester: (semester + " " + year), gpa});
            //mind that reviews is still blank
        }else{
            professorsMap[name] = {
                sections: [{
                    courseId,
                    // section: sectionObj.section,
                    semester: sectionObj.semester + " " + sectionObj.year,
                    gpa: sectionObj.gpa
                }],
                reviews: []
            };
        }
    }

    //can optimize by using Professor.bulkWrite
    Object.keys(professorsMap).map(async name => {
        const {sections, reviews} = professorsMap[name];
        let professor = await Professor.findOne({name});
        if(professor){
            await Professor.updateOne(
                { _id: professor._id},
                {
                    $addToSet: { sections: {$each: sections} },
                    $push: { reviews: { $each: reviews }}
                }
            );
            professor = await Professor.findOne({_id: professor._id})
        }else{
            professor = await Professor.create({name, sections, reviews});
        }
        return professor;
    });

    course.professors = Object.keys(professorsMap);
    await course.save();
    const professorArray = Object.entries(professorsMap).map(([name, obj]) => {
        const { reviews, sections } = obj;
        return { name, reviews, sections };
    })

    //want to return array instead of map
    return res.status(200).json(professorArray);
}

module.exports = { 
    getProfessors 
}