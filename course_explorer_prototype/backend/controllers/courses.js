const Course = require('../models/course');
const cheerio = require('cheerio');
// const mongoose = require('mongoose');

const getCourses = async (req, res) => {
    const { dept: deptRaw } = req.params;
    const dept = deptRaw.toLowerCase();

    let courses = await Course.find({department: dept.toUpperCase()}).sort({number: -1});
    
    //attempt to get courses, if can't then assume invalid
    if(courses.length === 0){
        const message = [];
        const response = await fetch(`https://catalog.tamu.edu/undergraduate/course-descriptions/${dept}/`, {
            method: "GET"
        })
        const html = await response.text();
        const $ = cheerio.load(html);
        const elements = $(".courseblock").toArray();

        if(elements.length === 0){
            return res.status(404).json({ error: `Department ${dept} not found or has no course listings.`});
        }

        for(const element of elements){
            const title = $(element).find('.courseblocktitle');
            const dept = title.text().slice(0,4);
            const number = title.text().slice(5,8);
            const courseTitle = title.text().slice(9);
            const desc = $(element).find(".courseblockdesc");
            const description = desc.text();
            try{   
                const course = await Course.create({department: dept, number, title: courseTitle, description});
                message.push(course);
            }catch(error){
                message.push(error);
            }
        }
        courses = message;
    }
    return res.status(200).json(courses);
}

module.exports = {
    getCourses
}