import Navigation from "./Navigation";
import styles from "./Header.module.css";

function Header() {
  return (
    // Navbar principal con color primario
    <header className={`navbar navbar-expand-sm navbar-dark bg-dark ${styles["main-header"]}`} id="navbarToggleExternalContent">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h2">
          Panadería Tradicional
        </span>

        {/* Botón hamburguesa: data-bs-target debe coincidir con el id del .collapse */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* Icono default de Bootstrap para el toggler */}
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenedor que se colapsa en mobile */}
        <div className="collapse navbar-collapse" id="mainNav">
          <Navigation />
        </div>
      </div>
    </header>
  );
}

export default Header;
