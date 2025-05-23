import Course from "../components/course";
import CourseForm from "../components/courseForm";

const Home = () => {
    return (
        <div className = "home">
            <CourseForm />
            <div className = "courses-container">
                COURSES CONTAINER
                <Course />
            </div>
        </div>
    )
}

export default Home;