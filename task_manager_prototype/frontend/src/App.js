import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import components
import Navbar  from "./components/Navbar";
import Home from "./pages/Home";

function App() {
    const dummyTask = {
        title: "for dummies",
        description: "stupid fucking task",
        dueDate: Date.now(),
        _id: 412412512551
    }
    const dummyTask2 = {
        title: "for dummies 2",
        description: "stupid fucking task 2",
        dueDate: Date.now(),
        _id: 41241251255,
    }
    return (
        <div className = "app">
            <BrowserRouter>
                <Navbar />
                <div className = "pages">
                    <Routes>
                        <Route
                            path = "/"
                            element = { <Home />}
                        ></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;