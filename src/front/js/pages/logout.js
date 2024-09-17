import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Logout = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.logout(); // Llama a la función logout para eliminar el token
        navigate("/login"); // Redirige al login
    }, []);

    return (
        <div className="container mt-5">
            <h2>Cerrando sesión...</h2>
        </div>
    );
};