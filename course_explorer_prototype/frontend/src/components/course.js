import { useEffect } from "react";

const Course = ( {course} ) => {
    //course is defined to follow the mongodb schema.
    const {title, description, department, number, professors} = course;

    useEffect(() => {
        const fetchProfessors = async () => {
            const response = await fetch(`/server/api/professors/${department}/${number}`, {
                method: "GET"
            });
            const json = await response.json();

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

            <button onClick = {fetchProfessors} className = "showProfessors">
                SHOW PROFESSORS
            </button>
            <div className = "professors">
                {professors && Object.keys(professors).map(professorName => (
                    <li key = {professorName}>
                        <h3>{professorName}</h3>
                        <p>Sections taught: {professors[professorName].sections.length}</p>
                    </li>
                ))}
            </div>
        </div>
    )
}

export default Course;