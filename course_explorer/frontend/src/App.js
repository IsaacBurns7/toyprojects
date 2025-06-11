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
                <div class="professor-card">
                    <div class="card-header">
                        <h1 class="professor-name">{professor.info.name}</h1>
                        <div class="years-taught">Teaching for {professor.info.yearsTaught} years</div>
                    </div>
                    <div class="card-body">
                        <div class="rating">
                            <span class="rating-value">{professor.info.averageRating}</span>
                            <div class="stars">★★★★★</div>
                        </div>
                        
                        <div class="stats-container">
                            <div class="stat-item">
                                <div class="stat-value">{professor.info.averageGPA}</div>
                                <div class="stat-label">Average GPA</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">{professor.info.totalStudents}</div>
                                <div class="stat-label">Students</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">{professor.info.totalSections}</div>
                                <div class="stat-label">Sections</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">{professor.info.totalRatings}</div>
                                <div class="stat-label">Ratings</div>
                            </div>
                        </div>
                        
                        <div class="courses-title">Courses Taught</div>
                        <div class="courses-list">
                            {professor.courses.map((courseId) => (
                                <span class="course-tag">{courseId}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default App;