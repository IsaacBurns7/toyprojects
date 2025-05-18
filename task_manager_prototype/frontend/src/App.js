import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//import components
import Navbar  from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from './hooks/useAuthContext';

function App() {
    const { user } = useAuthContext();

    return (
        <div className = "app">
            <BrowserRouter>
                <Navbar />
                <div className = "pages">
                    <Routes>
                        <Route
                            path = "/"
                            element = {user ? <Home /> : <Navigate to = "/login"/>}
                        ></Route>
                        <Route 
                            path = "/login"
                            element = {user ? <Navigate to = "/" />: <Login />}
                        ></Route>
                        <Route
                            path = "/signup"
                            element = { user ? <Navigate to = "/"/> : <Signup />}
                        ></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;