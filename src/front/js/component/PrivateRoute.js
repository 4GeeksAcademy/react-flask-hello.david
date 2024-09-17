import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

const PrivateRoute = ({ children }) => {
    const { actions } = useContext(Context);
    const isAuthenticated = actions.isAuthenticated();

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;