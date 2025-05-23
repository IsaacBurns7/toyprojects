import { useState } from "react";

const CourseForm = () => {
    const [dept, setDept] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`/server/api/courses/${dept}`, {
            method: "GET",
        });

        const json = await response.json();

        if(response.ok){
            setDept("");
            console.log("searching for dept", json);
        }
    }

    return (
        <form className = "department" onSubmit = {handleSubmit}>
            <h3>Enter desired department</h3>
            <label>Department: </label>
            <input 
                type = "text"
                onChange={(e) => setDept(e.target.value)}
                value = {dept}
                // className = {emptyFields.includes("dept") ? "error" : ""}
            ></input>
            <button>Fetch catalog!</button>
        </form>
    )
}

export default CourseForm;