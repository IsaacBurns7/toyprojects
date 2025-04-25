import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

function formatDistnaceToNow(date, options){
    return formattedDate;
}

const WorkoutDetails = ( {workout} ) => {
    const { dispatch } = useWorkoutsContext();

    const handleClick = async (req, res) => {
        const response = await fetch('/server/api/workouts/' + workout._id, {
            method: "DELETE"
        });
        const json = await response.json();
        
        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json});
        }
    }

    return (
        <div className = "workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps }</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span onClick = {handleClick} className = "material-symbols-outlined">DELETE</span>
        </div>

    )
}

export default WorkoutDetails;