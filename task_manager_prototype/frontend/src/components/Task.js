const Task = ( {task} ) => {
    return (
        <div className= "task-details">
            <h4>{task.title}</h4>
            <p><strong>{task.description}</strong></p>
            <p><strong>{task.dueDate}</strong></p>
        </div>
    )
}

export default Task;