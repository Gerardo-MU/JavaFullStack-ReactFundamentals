// React Hooks
import React, { useState, useContext } from "react";

// Hooks de React Router para navegación y obtención de información de ruta
import { useNavigate, useLocation } from "react-router-dom";

//Componentes
import AuthContext from "../../context/AuthContext";

//Estilos
import styles from "./Register.module.css";

function Register() {

    const location = useLocation();
    let from = location.pathname || '/';

    // Estados locales para cada campo
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Accedemos a la función onRegister del contexto
    const { onRegister } = useContext(AuthContext);

    // Hook de navegación
    const navigate = useNavigate();

    // Maneja el envío del formulario
    const submitHandler = (event) => {
    event.preventDefault();

    // Llamamos a la función de registro del contexto
    onRegister(name, lastname, email, password, (userId) => {
        alert(`¡Usuario registrado! Tu ID es: ${userId}`);
        debugger;
        
        event.preventDefault();
        if (from === '/register') {
            from = `/home/${userId}`;
        }
        navigate(from, { replace: true });
    });

    // Limpia los campos del formulario
    setName("");
    setLastname("");
    setEmail("");
    setPassword("");
    };

    // Manejador para cancelar y volver a la página principal
    const cancelHandler = () => {
        navigate("/");
    };

  return (
    <div className={`container ${styles.registerContainer}`}>
    <div className="row justify-content-center mt-5">
    <div className="col-md-6">
        <h2 className="text-center mb-4">Registro de Usuario</h2>
        <form onSubmit={submitHandler}>

        {/* Nombre */}
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            />
        </div>

        {/* Apellido */}
        <div className="mb-3">
            <label htmlFor="lastname" className="form-label">Apellido</label>
            <input
            id="lastname"
            type="text"
            required
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="form-control"
            />
        </div>

        {/* Correo */}
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo</label>
            <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            />
        </div>

        {/* Contraseña */}
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            />
        </div>

        {/* Botones de acción */}
        <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
            Registrar
            </button>
            <button type="button" className="btn btn-secondary" onClick={cancelHandler}>
            Cancelar
            </button>
        </div>
        </form>
        
    </div>
    </div>
    </div>
  );
}

export default Register;
