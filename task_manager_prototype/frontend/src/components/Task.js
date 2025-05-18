import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Task = ( {task} ) => {
    const { dispatch } = useTasksContext();
    const { user } = useAuthContext();
    const date = new Date(task.dueDate);
    const formattedDate = date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })

    const handleDelete = async (req, res) => {
        const response = await fetch(`/server/api/tasks/${task._id}`, {
            method: "DELETE",
            headers: { 
                "Authorization": `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        console.log(json);

        if(response.ok){
            dispatch({type: 'DELETE_TASK', payload: json});
        }
    }

    return (
        <div className= "task-details">
            <h4>{task.title}</h4>
            <p><strong>{task.description}</strong></p>
            <p><strong>{formattedDate}</strong></p>
            <span onClick = {handleDelete} className = "material-symbols-outlined">DELETE</span>
        </div>
    )
}

export default Task;