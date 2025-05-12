import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { TasksContextProvider } from './context/taskContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <TasksContextProvider>
            <App />
        </TasksContextProvider>
    </React.StrictMode>
);