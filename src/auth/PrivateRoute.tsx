import React, {useEffect} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "./AuthHook";

// Определяем функциональный компонент PrivateRoute
export const PrivateRoute = () => {
    const {isAuthenticated, setAuth} = useAuth()
    const location = useLocation()

    useEffect(() => {
        fetch("http://localhost:8080/users/me", {credentials: "include"})
            .then(res => res.ok && setAuth(true))
    })

    return (isAuthenticated ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>)
};
