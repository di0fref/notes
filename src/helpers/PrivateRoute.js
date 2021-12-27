
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    let auth = null;
    if (localStorage.getItem('api_token')) {
        auth = true;
    }
    return auth ? <Outlet/> : <Navigate to="/login"/>;
}

