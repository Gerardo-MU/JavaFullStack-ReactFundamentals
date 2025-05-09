// Importaciones de React y librerías
// -------------------------------

// React Hooks
import { useState, useEffect, useReducer, useContext } from "react";
// Hooks de React Router para navegación y obtención de información de ruta
import { useNavigate, useLocation } from "react-router-dom";

// Estilos en módulos CSS
import styles from "./Login.module.css";

// Contexto de autenticación (contiene la lógica de login)
import AuthContext from "../../context/AuthContext";


// -------------------------------
// Reducer que manejará el estado y la validación de email y password
// -------------------------------
function reducer(state, action) {
  switch (action.type) {
    // Actualiza el email y verifica si contiene '@'
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.payload,           // Nuevo valor del email
        emailIsValid: action.payload.includes("@"), // Valida si contiene '@'
      };

    // Actualiza la password y valida que sea > 6 caracteres
    case "UPDATE_PASSWORD":
      return {
        ...state,
        password: action.payload,                              // Nuevo valor de la password
        passwordIsValid: action.payload.trim().length > 6,     // Verifica longitud
      };

    // Acción que se dispara cuando el campo pierde el foco
    // y re-verifica la validez de ambos campos
    case "INPUT_BLUR":
      return {
        ...state,
        emailIsValid: state.email.includes("@"),              // Vuelve a validar email
        passwordIsValid: state.password.trim().length > 6,    // Vuelve a validar password
      };

    // Cualquier otra acción no contemplada
    default:
      return state;
  }
}


// -------------------------------
// Componente principal de Login
// -------------------------------
function Login() {
  // Hook de React Router para navegar a otra ruta
  const navigate = useNavigate();

  // Hook de React Router para saber desde dónde viene el usuario (ruta actual)
  const location = useLocation();

  // Extraemos la función onLogin del AuthContext
  // (esto se encargará de la lógica de autenticación)
  const { onLogin } = useContext(AuthContext);

  // Si no hay un 'pathname', toma '/' como valor por defecto
  let from = location.pathname || '/';

  // formIsValid determina si el formulario entero (email + password) es válido
  const [formIsValid, setFormIsValid] = useState(false);

  // useReducer se utiliza para manejar el estado del formulario
  // Inicialmente, email y password están vacíos y su validez es null
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    emailIsValid: null,
    password: "",
    passwordIsValid: null,
  });

  // Desestructuramos emailIsValid y passwordIsValid del estado,
  // para usarlos más fácilmente
  const { emailIsValid, passwordIsValid } = state;


  // -------------------------------
  // useEffect para validar el formulario con un retardo (debounce)
  // -------------------------------
  useEffect(() => {
    // Inicia un timer de 500ms
    const timer = setTimeout(() => {
      // Después de 500ms, formIsValid se actualizará a true
      // si ambos campos son válidos
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    // Al volver a ejecutar el efecto, limpiamos el timer anterior
    // para evitar validaciones múltiples mientras el usuario teclea
    return () => {
      clearTimeout(timer);
    };
    // Se ejecuta cada vez que cambie la validez del email o password
  }, [emailIsValid, passwordIsValid]);


  // -------------------------------
  // Manejadores de eventos
  // -------------------------------

  // Actualiza el email y su validación con el valor del input
  const emailChangeHandler = (event) => {
    dispatch({ type: "UPDATE_EMAIL", payload: event.target.value });
  };

  // Actualiza la password y su validación con el valor del input
  const passwordChangeHandler = (event) => {
    dispatch({ type: "UPDATE_PASSWORD", payload: event.target.value });
  };

  // Se dispara cuando el input pierde el foco (onBlur),
  // disparando la acción que re-valida ambos campos
  const validateHandler = () => {
    dispatch({ type: "INPUT_BLUR" });
  };

  // -------------------------------
  // Manejo del submit del formulario (login)
  // -------------------------------
  const submitHandler = (event) => {
    // Evita que el formulario recargue la página
    event.preventDefault();

    // Llamamos a la función onLogin del contexto, pasándole:
    // 1) El email del state
    // 2) Un callback que recibe el userId y hace la navegación con useNavigate
    onLogin(state.email, (userId) => {
      // console.log('userId', userId);
      // console.log('userId from', from);
      
      // Si la ruta 'from' era '/login', en lugar de volver a '/login'
      // redirigimos a "/home/<userId>"
      if (from === '/login') {
        from = `/home/${userId}`;
      }

      // Redirigimos al usuario a 'from' o a la ruta por defecto
      // { replace: true } indica que reemplazamos la ruta actual en el historial,
      // en vez de apilarla
      navigate(from, { replace: true });
    });
  };

  // Manejador para ir a la pantalla de registro
  const goToRegisterHandler = () => {
    navigate("/register");
  };


  // -------------------------------
  // Renderizado del componente
  // -------------------------------
  return (
    <div className={`container ${styles.loginContainer}`}>
      <div className="row justify-content-center mt-5">
        {/* 
          col-md-6 en pantallas medianas y superiores (>=768px) 
          se mostrará en la mitad del ancho. 
          En pantallas menores, se ajusta al 100% automáticamente. 
        */}
        <div className="col-md-6">
          <h2 className="text-center mb-4">Ingresa con tu cuenta</h2>
          <p className="text-center">Obtén ofertas exclusivas</p>

          <form onSubmit={submitHandler}>
            {/* Control de Correo */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo
              </label>
              <input
                type="email"
                id="email"
                value={state.email}
                onChange={emailChangeHandler}
                onBlur={validateHandler}
                className={`form-control ${
                  state.emailIsValid === false ? "is-invalid" : ""
                }`}
              />
            </div>

            {/* Control de Contraseña */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={state.password}
                onChange={passwordChangeHandler}
                onBlur={validateHandler}
                className={`form-control ${
                  state.passwordIsValid === false ? "is-invalid" : ""
                }`}
              />
            </div>

            {/* Botones de acción */}
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary" disabled={!formIsValid}>
                Login
              </button>
              <button type="button" className="btn btn-secondary" onClick={goToRegisterHandler}>
                Registro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Exportamos el componente para usarlo en la aplicación
export default Login;
