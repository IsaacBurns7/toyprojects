import { createContext, useReducer } from "react";

export const ProfessorsContext = createContext();

/*
STATE DEFINTIION
{
    "professors": [professorSchema]
}
*/
export const professorsReducer = (state, action) => {
    // console.log("ACTION", action);
    // console.log("STATE", state);
    switch(action.type){
        case "SET_PROFESSORS":
            return {
                professors: action.payload
            }
        case "ADD_PROFESSORS":
            return {
                professors: [...action.payload, ...state.professors]
            }
        case "ADD_PROFESSOR":
            return {
                professors: [action.payload, ...state.professors]
            }
        default: 
            return state;
    }
}

export const ProfessorsContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(professorsReducer, {
        professors: []
    });

    return (
        <ProfessorsContext.Provider value = {{...state, dispatch}}>
            {children}
        </ProfessorsContext.Provider>
    )
}