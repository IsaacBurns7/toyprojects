import { useEffect, useState } from "react";
import React from "react";

const App = () => {
    const [professors, setProfessors] = useState([]);

    useEffect(() => {
        const fetchProfessors = async () => {
            const response = await fetch ("/server/api/professors/CSCE/120", {
                method: "GET"
            });
            const profJson = await response.json();
            console.log("profJson: ", profJson);


            if(response.ok){
                setProfessors(profJson);
            }
        }
        fetchProfessors();
    }, []);

    return (
        <div className = "app">
            professors: {professors}
        </div>
    );
}

export default App;