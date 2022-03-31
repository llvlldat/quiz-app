import { useContext } from "react";
import { userContext } from "../context/Context";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Login from "../components/Login";

function Guard() {
    let location = useLocation();
    const context = useContext(userContext);
    return context.user.role ? (
        location.pathname === "/login" ? (
            <Navigate to="/dashboard" />
        ) : (
            <Outlet />
        )
    ) : (
        <Login />
    );
}

export default Guard;
