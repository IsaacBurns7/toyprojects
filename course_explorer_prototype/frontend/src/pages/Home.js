import { useEffect } from "react";
import { useCoursesContext } from "../hooks/useCourseContext";

import Course from "../components/course";
import CourseForm from "../components/courseForm";

const Home = () => {
    const {courses, dispatch} = useCoursesContext();
    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch("/server/api/courses/csce", {
                method: "GET",
                headers: {
                    
                }
            });
            const json = await response.json();
            // console.log(json);

            if(response.ok){
                dispatch({type: "SET_COURSES", payload: json});
            }
        }
        fetchCourses();
    }, [dispatch]);
    return (
        <div className = "home">
            <CourseForm />
            <div className = "courses-container">
                COURSES CONTAINER
                {courses && courses.map((course) => (
                    <Course key = {course._id} course = {course} />
                ))}
            </div>
        </div>
    )
}

export default Home;