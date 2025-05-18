import { useState } from 'react';
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (identifier, password) => {
        setIsLoading(true);
        setError(true);

        const response = await fetch('./server/api/user/login', { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({identifier, password})
        });
        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        if(response.ok){
            //may want to set is loading back to false ? not sure if this is needed
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: "LOGIN", payload: json});
        }
    }
    return {login, isLoading, error};
}