import React from "react";
import "./Task.css"

function Task({priorityLevel, taskTitle, taskDetails, dueDate}) {
    //assigned to?
    return (<div class = "task">
                <div class = "task-header">
                    <span class = "priority high">{priorityLevel}</span>
                    <div class = "task-actions">
                        <i class = "fas fa-ellipsis-v">task actions</i>
                    </div>
                </div>
                <h4>{taskTitle}</h4>
                <p>{taskDetails}</p>
                <div class = "task-footer">
                    <span class = "due-date">Due: {dueDate}</span>
                </div>
            </div>);
};

export default Task;

