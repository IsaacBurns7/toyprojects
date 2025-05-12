import { createContext, useReducer } from 'react';

export const TasksContext = createContext();

const tasksReducer = (state, action) => {
    switch(action.type){
        case 'CREATE_TASK':
            return { 
                tasks: [action.payload, ...state.tasks]
            }
        case 'DELETE_TASK':
            return { 
                tasks: state.tasks.filter((task) => {
                    return task._id !== action.payload._id;
                })
            }
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }
        default:
            return state;
    }
}

export const TasksContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(tasksReducer, {
        tasks: null
    });

    return ( 
        <TasksContext.Provider value = {{...state, dispatch}}>
            { children }
        </TasksContext.Provider>
    )
}