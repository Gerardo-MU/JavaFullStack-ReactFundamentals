import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Button from "../UI/Button/Button";
import styles from "./Navigation.module.css";

function Navigation() {
  const { isLoggedIn, onLogout } = useContext(AuthContext);

  return (
    
    <ul className={`navbar-nav ms-auto card-header-tabs ${styles.nav}`}>
      {/* Opción de inicio */}
      <li className="nav-item mx-2">
        <Link to="/" className="nav-link">
          Inicio
        </Link>
      </li>

      {/* Opción de nosotros */}
      <li className="nav-item mx-2">
        <Link to="/about" className="nav-link">
          Nosotros
        </Link>
      </li>

      {/* Opción de Login / Logout */}
      <li className="nav-item mx-2">
        {isLoggedIn ? (
          <Button 
            color="secondary"
            className="btn btn-secondary"
            onClick={onLogout}
            type="button"
          >
            LOGOUT
          </Button>
        ) : (
          <Link to="/login" className="btn btn-primary" type="button">
            Acceder
          </Link>
        )}
      </li>
    </ul>
  );
}

export default Navigation;
