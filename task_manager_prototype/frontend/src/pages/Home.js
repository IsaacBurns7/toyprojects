import { useEffect, useState } from "react";

//components

import Task from "../components/Task";
import TaskForm from "../components/TaskForm";

const Home = () => {
    const [tasks, setTasks] = useState(null);
 
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/server/api/tasks');
            console.log(response);
            const json = await response.json();
            console.log(json);

            if(response.ok){
                setTasks(json);
            }
        }
        fetchWorkouts();

    }, []);

    return (
        <div className = "home">
            <div className = "tasks">
                {tasks && tasks.map((task) => (
                    <Task key = {task._id} task = {task}></Task>
                ))}
            </div>
            <TaskForm />
        </div>
    );
}

export default Home;