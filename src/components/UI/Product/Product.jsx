import React from "react";
import styles from "./Product.module.css";

function Product({ product, onAdd }) {

  return (
    <div className={styles.product}>
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button className="btn btn-dark" onClick={() => onAdd(product)}>Agregar</button>
    </div>
  );
}

export default Product;
