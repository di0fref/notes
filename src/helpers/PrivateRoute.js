// import React, {useEffect, useState} from 'react';
// import {Navigate, Outlet} from 'react-router-dom';
// import {getAuth, onAuthStateChanged} from "firebase/auth";
//
// function PrivateRoute(props) {
//
//     const auth = getAuth();
//     const [user, setUser] = useState(props.user)
//
//
//     useEffect(() => {
//         console.log("PrivateRoute::useEffect")
//         setUser(props.user)
//     }, [props.user])
//
//     return user ? <Outlet/> : <Navigate to="/login"/>;
// }
//
// export default PrivateRoute

import {getAuth} from "firebase/auth";
import {Navigate, Outlet} from 'react-router-dom';

export default function PrivateRoute(props) {

    return getAuth().currentUser != null
        ? <Outlet/>
        : localStorage.getItem('expectSignIn')
            ? null
            : (
                    <Navigate to="/login"/>
            )
}
