import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/" element={<Navigate to="/login" />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
