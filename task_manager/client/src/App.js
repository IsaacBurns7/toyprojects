import React from 'react';
import { useState } from 'react';
import Header from './components/Layout/Header.jsx';
import Task from './components/Board/Task.jsx';
import Column from "./components/Board/Column.jsx";
import Board from "./components/Board/board.jsx";

function App(){
    const [columnsArray, setColumnsArray] = useState([
        {
            columnTitle: "To Do",
            tasks: [ //dummy
                {
                    priorityLevel: 'High',
                    taskTitle: 'Finish React project',
                    taskDetails: 'Complete all components and deploy to Netlify.',
                    dueDate: '2025-04-15'
                },
                {
                    priorityLevel: 'Medium',
                    taskTitle: 'Study for algorithms exam',
                    taskDetails: 'Go over sorting algorithms and dynamic programming.',
                    dueDate: '2025-04-10'
                },
                {
                    priorityLevel: 'Low',
                    taskTitle: 'Clean desk',
                    taskDetails: 'Organize books, clean monitor, wipe down surface.',
                    dueDate: '2025-04-20'
                }
            ]
        }
    ]);

    return (
        <div>
            <div>BEGIN ROOT</div>
            <Header />
            <Board columnsArray = {columnsArray}/>
            <div>END ROOT</div>
        </div>
    )
}

export default App;