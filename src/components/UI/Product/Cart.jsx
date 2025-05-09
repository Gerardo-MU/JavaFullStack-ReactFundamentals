import React from "react";
import styles from "./Cart.module.css";

function Cart({ cartItems, onPay, onCancel }) {

  // onPay: función cuando el usuario hace click en "Pagar"
  // onCancel: función cuando el usuario hace click en "Cancelar"

  // Cálculo del total, por ejemplo
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={styles.cart}>
      <h2>Carrito de Compras</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} ({item.quantity}x) - ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <div className={styles.actions}>
        <button className="btn btn-success" onClick={onPay}>Pagar</button>
        <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default Cart;
