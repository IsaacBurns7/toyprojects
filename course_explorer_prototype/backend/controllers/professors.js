const Course = require("../models/course");

const getProfessors = async (req, res) => {
    const { dept: deptRaw, number } = req.params;
    const dept = deptRaw.toLowerCase();

    //fetch shit from db, and if db not has, then fetch from anex
    let course = await Course.findOne({department: dept.toUpperCase(), number});

    if(!course){
        return res.status(400).json({error: `Course ${dept} ${number} not found.`});
    }
    let { professors } = course;

    if(!professors || Object.keys(professors).length === 0){
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
                professorsMap[name].sections.push({section, semester: (semester + " " + year), gpa});
                //mind that reviews is still blank
            }else{
                professorsMap[name] = {
                    sections: [{
                        section: sectionObj.section,
                        semester: sectionObj.semester + " " + sectionObj.year,
                        gpa: sectionObj.gpa
                    }],
                    reviews: []
                };
            }
        }
        course.professors = professorsMap;
        await course.save();
        return res.status(200).json(professorsMap);
    }

    return res.status(200).json(professors);
}

module.exports = { 
    getProfessors 
}