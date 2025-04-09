import React from "react";
import Task from "./Task.jsx";
import "./Column.css";

function Column({ columnObject }){ //taskArray is an array of objects
    console.log(columnObject);
    const {columnTitle, tasks} = columnObject;
    console.log(columnTitle);
    console.log(tasks);
    let taskCount = tasks.length;
    const taskList = tasks.map((taskObject) => {
        const {priorityLevel, taskTitle, taskDetails, dueDate} = taskObject;
        return (
            <Task 
            priorityLevel = {priorityLevel} 
            taskTitle = {taskTitle} 
            taskDetails = {taskDetails} 
            dueDate = {dueDate}/>
        );
    });

    return (
        <div class = "column">
            <div class = "column-header">
                <h3>{columnTitle}</h3>
                <span class = "task-count">Task Count: {taskCount}</span>
            </div>
            <div class = "task-list">
                {taskList}
                <button class = "add-task-btn"><i class = "fas fa-plus"></i> Add Task</button>
            </div>
        </div>
    );
}

export default Column;