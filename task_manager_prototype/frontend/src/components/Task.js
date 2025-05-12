const Task = ( {task} ) => {
    const handleDelete = (event) => {
        
    }

    return (
        <div className= "task-details">
            <h4>{task.title}</h4>
            <p><strong>{task.description}</strong></p>
            <p><strong>{task.dueDate}</strong></p>
            <button onClick = {handleDelete} className = "materials-outlined-symbols">DELETE</button>
        </div>
    )
}

export default Task;