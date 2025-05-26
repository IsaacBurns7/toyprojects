import { ProfessorsContext } from "../context/professorContext";
import { useContext } from "react";

export const useProfessorsContext = () => {
    const context = useContext(ProfessorsContext);

    if(!context){
        throw Error("useProfessorsContext must used inside a ProfessorsContextProvider");
    }

    return context;
}