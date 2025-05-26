import { createContext, useReducer } from "react";

export const CoursesContext = createContext();

/*
STATE DEFINITION
{
    "courses": [courseSchema]
}
*/
export const coursesReducer = (state, action) => {
    switch(action.type){
        case "SET_COURSES":
            return {
                courses: action.payload
            }
        // case "SET_PROFESSORS":
        //     return { 

        //     }
        default:
            return state
    }
}

export const CoursesContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(coursesReducer, {
        courses: null
    });

    return (
        <CoursesContext.Provider value = {{...state, dispatch}}>
            {children}
        </CoursesContext.Provider>
    )
}