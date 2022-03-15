import React from 'react'
import { Navigate, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

    // Add your own authentication on the below line.
    const isLogged = window.sessionStorage.getItem("userID") ? true : false;

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isLogged ? <Component/> : <Navigate to="/connexion" />;
}

export default PrivateRoute