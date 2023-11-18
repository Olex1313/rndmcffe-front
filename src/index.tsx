import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";

import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css'
import "./style.css";
import {BrowserRouter} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import {ReactNotifications} from "react-notifications-component";
import AuthProvider from "./auth/AuthContext";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <CookiesProvider>
        <BrowserRouter>
            <ReactNotifications/>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </BrowserRouter>
    </CookiesProvider>
);
