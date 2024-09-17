import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario después del registro
import { Context } from "../store/appContext";

export const Signup = () => {
    const { actions } = useContext(Context); // Accedemos a las acciones del estado global
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // Para mostrar errores si ocurre alguno
    const navigate = useNavigate(); // Para redirigir después de un registro exitoso

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Limpiar el error anterior (si lo hay)

        const success = await actions.signup(email, password); // Llamamos a la acción signup

        if (success) {
            navigate("/login"); // Redirigimos al usuario a la página de login si el registro es exitoso
        } else {
            setError("Error en el registro. Inténtalo de nuevo."); // Mostramos un error si el registro falla
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar el error si existe */}
                <button type="submit" className="btn btn-primary">
                    Registrarse
                </button>
            </form>
        </div>
    );
};