import { useAuthContext } from "./useAuthContext";
import { useTasksContext } from "./useTasksContext";

export const useLogout = () => {
    const { dispatch: dispatchTasks } = useTasksContext();
    const { dispatch: dispatchAuth} = useAuthContext();
    const logout = () => {
        localStorage.removeItem('user');
        dispatchAuth({type: "LOGOUT"});
        dispatchTasks({type: 'SET_TASKS', payload: null})
    }
    return {logout};
}