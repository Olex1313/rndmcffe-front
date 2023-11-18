import React from "react";
import {createContext, useState} from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    setAuth: (auth: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setAuth: () => {

    },
});

const AuthProvider = ({children}: { children: JSX.Element }) => {
    const [isAuthenticated, setAuth] = useState<boolean>(false);
    return (
        <AuthContext.Provider value={{isAuthenticated, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
