import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from "../hooks/useAuthContext";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();
    //console.log(workouts);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/server/api/workouts', {
                method: "GET",
                headers: { 
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            // console.log(json);

            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        if(user){
            fetchWorkouts();
        }
    }, [dispatch, user]);

    // console.log(workouts);
    // console.log(user);

    return (
        <div className = "home">
            <div className = "workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;