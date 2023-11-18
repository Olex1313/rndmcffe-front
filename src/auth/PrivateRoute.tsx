import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "./AuthHook";

// Определяем функциональный компонент PrivateRoute
export const PrivateRoute = () => {
    const {isAuthenticated} = useAuth()
    const location = useLocation()
    return (isAuthenticated ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>)
};
