import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Guard from "./auth/Guard";
import { userContext } from "./context/Context";
import { useContext } from "react";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import Navigation from "./components/Navigation";

function App() {
    const context = useContext(userContext);

    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route element={<Guard />}>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            context.user.role === "admin" ? (
                                <AdminDashboard />
                            ) : (
                                <UserDashboard />
                            )
                        }
                    />
                </Route>
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
