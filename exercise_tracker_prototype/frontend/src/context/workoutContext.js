import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload //payload is array of objects
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts] //payload is single object, state.workouts spreads previous workouts
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => {
                    console.log("workout vs payload", workout._id, action.payload._id);
                    return workout._id !== action.payload._id;
                }) 
            }
        default: 
            return state
    }
}

export const WorkoutsContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    });
    
    return (
        <WorkoutsContext.Provider value = {{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}