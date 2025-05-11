import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
    const { dispatch: dispatchWorkouts } = useWorkoutsContext();
    const { dispatch: dispatchAuth } = useAuthContext();
    const logout = () => {
        localStorage.removeItem('user');
        dispatchAuth({type: "LOGOUT"});
        dispatchWorkouts({type: 'SET_WORKOUTS', payload: null})
    }


    return {logout};
}