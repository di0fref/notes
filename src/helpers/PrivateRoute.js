
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    let auth = null; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    console.log(localStorage.getItem('api_token'))

    console.log("PrivateRoute")
    if (localStorage.getItem('api_token')) {
        auth = true;
    }
    return auth ? <Outlet/> : <Navigate to="/login"/>;
}

