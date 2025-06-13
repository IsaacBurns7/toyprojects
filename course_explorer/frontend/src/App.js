import { useEffect, useState } from "react";
import React from "react";

const App = () => {
    const [professors, setProfessors] = useState([]);

    useEffect(() => {
        // const fetchProfessors = async () => {
        //     const response = await fetch ("/server/api/professors/CSCE/120", {
        //         method: "GET"
        //     });
        //     const profJson = await response.json();
        //     console.log("profJson: ", profJson);


        //     if(response.ok){
        //         setProfessors(profJson);
        //     }
        // }
        // fetchProfessors();

        const professorObj1 = {
             info: {
                name: "professor1Name", 
                averageGPA: 3.58,
                totalSections: 12,
                totalStudents: 144,
                averageRating: 4.23,
                totalRatings: 15, 
                yearsTaught: 12,   
            },
            courses: ["courseId1","courseId2"]
        };
        const professorObj2 = {
             info: {
                name: "professor2Name", 
                averageGPA: 3.59,
                totalSections: 13,
                totalStudents: 124,
                averageRating: 4.13,
                totalRatings: 1123, 
                yearsTaught: 1212,
            },
            courses: ["courseId1", "courseId2"]
        };
        const professorData = [professorObj1, professorObj2];
        setProfessors(professorData);
    }, []);

    return (
        <div className = "app">
            {professors && professors.map((professor) => (
            <div key={professor.id} className="professor-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="card-header bg-blue-600 p-4 text-white">
                    <h1 className="professor-name text-xl font-bold">{professor.info.name}</h1>
                    <div className="years-taught text-blue-100">Teaching for {professor.info.yearsTaught} years</div>
                </div>
                <div className="card-body p-4">
                    <div className="rating flex items-center mb-4">
                    <span className="rating-value text-3xl font-bold mr-2">{professor.info.averageRating}</span>
                    <div className="stars text-yellow-400 text-xl">★★★★★</div>
                    </div>
                    
                    <div className="stats-container grid grid-cols-4 gap-2 mb-4">
                    <div className="stat-item bg-gray-100 p-2 rounded text-center">
                        <div className="stat-value font-bold text-blue-600">{professor.info.averageGPA}</div>
                        <div className="stat-label text-xs text-gray-600">Average GPA</div>
                    </div>
                    <div className="stat-item bg-gray-100 p-2 rounded text-center">
                        <div className="stat-value font-bold text-blue-600">{professor.info.totalStudents}</div>
                        <div className="stat-label text-xs text-gray-600">Students</div>
                    </div>
                    <div className="stat-item bg-gray-100 p-2 rounded text-center">
                        <div className="stat-value font-bold text-blue-600">{professor.info.totalSections}</div>
                        <div className="stat-label text-xs text-gray-600">Sections</div>
                    </div>
                    <div className="stat-item bg-gray-100 p-2 rounded text-center">
                        <div className="stat-value font-bold text-blue-600">{professor.info.totalRatings}</div>
                        <div className="stat-label text-xs text-gray-600">Ratings</div>
                    </div>
                    </div>
                    
                    <div className="courses-title font-semibold text-gray-700 mb-2">Courses Taught</div>
                    <div className="courses-list flex flex-wrap gap-2">
                    {professor.courses.map((courseId) => (
                        <span key={courseId} className="course-tag bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {courseId}
                        </span>
                    ))}
                    </div>
                </div>
            </div>
            ))}
        </div>
    );
}

export default App;