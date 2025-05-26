import { useEffect } from "react";
import { useProfessorsContext } from "../hooks/useProfessorContext";
import { Professor } from "./professor";

const Course = ( {course} ) => {
    //course is defined to follow the mongodb schema.
    const {title, description, department, number, professors} = course;
    const { dispatch } = useProfessorsContext();

    useEffect(() => {
        const fetchProfessors = async () => {
            const response = await fetch(`/server/api/professors/${department}/${number}`, {
                method: "GET"
            });
            const json = await response.json();
            console.log(json);

            if(response.ok){
                dispatch({type: "SET_PROFESSORS", payload: json})
            }
        }
        fetchProfessors();
    }, [dispatch]);

    return (
        <div className = "course">
            <h2 className = "title">
                {`${department} ${number} ${title}`}
            </h2>

            <button className = "showDescription">
                SHOW DESCRIPTION
            </button>
            <p className = "description">
                {`${description}`}
            </p>

            <button className = "showProfessors">
                SHOW PROFESSORS
            </button>
            <div className = "professors">
                {professors && professors.map(professorObj => (
                    <Professor department = {department} number = {number}/>
                ))}
            </div>
        </div>
    )
}

export default Course;