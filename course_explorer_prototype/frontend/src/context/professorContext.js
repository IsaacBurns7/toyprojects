import { createContext, useReducer } from "react";

export const ProfessorsContext = createContext();

/*
STATE DEFINTIION
{
    "professors": [professorSchema]
}
*/
export const professorsReducer = (state, action) => {
    switch(action.type){
        case "SET_PROFESSORS":
            return {
                professors: action.payload
            }
        default: 
            return state;
    }
}

export const ProfessorsContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(professorsReducer, {
        professors: null
    });

    return (
        <ProfessorsContext.Provider value = {{...state, dispatch}}>
            {children}
        </ProfessorsContext.Provider>
    )
}