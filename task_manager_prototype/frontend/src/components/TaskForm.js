import { useState } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';
import { useAuthContext } from '../hooks/useAuthContext';

const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { dispatch } = useTasksContext();
    const { user } = useAuthContext(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const [hours, minutes] = dueDate.split(':');
        const time = new Date();
        time.setHours[parseInt(hours)];
        time.setMinutes(parseInt(minutes));
        time.setSeconds(0);
        time.setMilliseconds(0);
        const task = {title, description, dueDate: time};

        if(!user){
            setError("Cannot submit tasks if not logged in");
            return;
        }

        const response = await fetch('/server/api/tasks', {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        console.log(json);

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
            console.log("new task added!", json);
            dispatch({type: "CREATE_TASK", payload: json});
        }
        console.log(emptyFields);
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
            {error && <div className = "error">{error}</div>}
        </form>
    )
};

export default TaskForm;