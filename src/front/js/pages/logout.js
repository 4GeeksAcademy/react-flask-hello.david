import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Logout = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.logout(); 
        navigate("/login"); 
    }, []);

    return (
        <div className="container mt-5">
            <h2>Cerrando sesión...</h2>
        </div>
    );
};