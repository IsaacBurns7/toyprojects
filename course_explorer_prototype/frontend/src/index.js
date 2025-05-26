import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CoursesContextProvider } from "./context/courseContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<React.StrictMode>
    <CoursesContextProvider>
        <App />
    </CoursesContextProvider>
</React.StrictMode>
);