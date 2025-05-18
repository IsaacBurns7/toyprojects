import { useEffect, useState } from "react";

//components

import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
    const {tasks, dispatch} = useTasksContext();
    const {user} = useAuthContext();
 
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/server/api/tasks', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            console.log(json);

            if(response.ok){
                dispatch({type: "SET_TASKS", payload:json});
            }
        }
        if(user) {
            fetchWorkouts();
        }
    }, [dispatch, user]);

    console.log(tasks);

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