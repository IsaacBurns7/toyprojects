import { useState } from 'react';

const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const task = {title, description, dueDate};

        const response = await fetch('/server/api/tasks', {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();

        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if(response.ok){
            setTitle("");
            setDescription("");
            setDueDate("");
            setError(null);
            setEmptyFields([]);
            console.log("new workout added!", json);
            //dispatch();
        }
    }

    return (
        <form className = "create" onSubmit = {handleSubmit}>
            <h3>Add a new task</h3>
            <label>Task title</label>
            <input 
                type = "text"
                onChange = {(e) => setTitle(e.target.value)}
                value = {title}
                className = {emptyFields.includes("title") ? "error" : ""}
            ></input>
            <label>Description</label>
            <textarea 
                type = "text" 
                onChange = {(e) => setDescription(e.target.value)}
                value = {description}
                className = {emptyFields.includes("description") ? "error": ""}
            />
            <label>Due Date</label>
            <input
                type = "time"
                onChange = {(e) => setDueDate(e.target.value)}
                value = {dueDate}
                className = {emptyFields.includes("dueDate") ? "error": ""}
            ></input>
            <button>Add Task!</button>
        </form>
    )
};

export default TaskForm;