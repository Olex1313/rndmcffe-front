import React, {useEffect} from "react";
import {absoluteUrl} from "../host";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "./AuthHook";

// Определяем функциональный компонент PrivateRoute
export const PrivateRoute = () => {
    const {isAuthenticated, setAuth} = useAuth()
    const location = useLocation()

    useEffect(() => {
        fetch(absoluteUrl("/users/me"), {credentials: "include"})
            .then(res => res.ok && setAuth(true))
    })

    return (isAuthenticated ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>)
};
