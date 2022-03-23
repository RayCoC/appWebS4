import React from 'react'
import { Navigate, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const isLogged = window.sessionStorage.getItem("userID") ? true : false;

    return isLogged ? <Component/> : <Navigate to="/connexion" />;
}

export default PrivateRoute
