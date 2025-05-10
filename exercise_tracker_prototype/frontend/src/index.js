import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { WorkoutsContextProvider } from './context/workoutContext';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

