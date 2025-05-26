import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CoursesContextProvider } from "./context/courseContext";
import { ProfessorsContextProvider } from "./context/professorContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<React.StrictMode>
    <CoursesContextProvider>
        <ProfessorsContextProvider>
            <App />
        </ProfessorsContextProvider>
    </CoursesContextProvider>
</React.StrictMode>
);