import React from "react";
// Importamos los estilos del módulo CSS
import styles from "./Public.module.css";

function Public() {
  return (
    <div className={styles["welcome-container"]}>
      <div className={styles["overlay-content"]}>
        <h1>Bienvenido a Panadería Tradicional</h1>
        <p>
          Disfruta de nuestros panes recién horneados, con recetas artesanales 
          que han pasado de generación en generación. Explora nuestra gran 
          variedad de productos y descubre tu favorito. ¡Te esperamos con los 
          brazos abiertos!
        </p>
      </div>
    </div>
  );
}

export default Public;
