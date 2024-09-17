import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store } = useContext(Context);

    return (
        <nav className="navbar navbar-light bg-success">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Home
                </Link>
                <div className="ml-auto">
                    {!store.userToken ? ( // Verifica si el usuario no está autenticado
                        <>
                            <Link to="/login" className="btn btn-primary me-2">
                                Iniciar Sesión
                            </Link>
                            <Link to="/signup" className="btn btn-secondary">
                                Registrarse
                            </Link>
                        </>
                    ) : (
                        <Link to="/logout" className="btn btn-danger">
                            Cerrar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};