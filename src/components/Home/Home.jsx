import React, { useState } from "react";

import PortalRoot from "../UI/Product/PortalRoot";
import Product from "../UI/Product/Product";
import Cart from "../UI/Product/Cart";
import styles from"./Home.module.css";


function Home() {

  const productsData = [
    { id: 1, name: "Bolillo", price: 25, imageUrl: "../../src/images/bolillo.jpeg" },
    { id: 2, name: "Baguette",    price: 30, imageUrl: "../../src/images/baguett.jpeg" },
    { id: 3, name: "Bolitas",    price: 30, imageUrl: "../../src/images/bolitas.jpeg" },
    { id: 4, name: "Integral",    price: 30, imageUrl: "../../src/images/centeno.jpeg" },
    { id: 5, name: "Croissant",    price: 30, imageUrl: "../../src/images/croassan.jpeg" },
    { id: 6, name: "Hamburguesa",    price: 30, imageUrl: "../../src/images/hamburguesa.jpeg" },
    { id: 7, name: "Pan de Caja",    price: 30, imageUrl: "../../src/images/pan_caja.jpeg" },
    { id: 8, name: "Panque chispas",    price: 30, imageUrl: "../../src/images/panque_chocolate.jpeg" },
    { id: 9, name: "Pan dulce",    price: 30, imageUrl: "../../src/images/panque.jpeg" },
    { id: 10, name: "Donas",    price: 30, imageUrl: "../../src/images/dona.jpeg" },
    { id: 11, name: "Pudín",    price: 30, imageUrl: "../../src/images/pudin.jpeg" },
    { id: 12, name: "Bolillo",    price: 30, imageUrl: "../../src/images/bolillo.jpeg" }
  ];

  const [cartItems, setCartItems] = useState([]);

  // Agregar producto al carrito
  const handleAdd = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handlePay = () => {
    alert("Procesando pago...");
    // lógica extra...
  };

  const handleCancel = () => {
    setCartItems([]);
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.products}>
        {productsData.map((prod) => (
          <Product key={prod.id} product={prod} onAdd={handleAdd} />
        ))}
      </div>

      {/* El carrito se monta en un Portal para que aparezca como overlay o sidebar */}
      <PortalRoot>
        <Cart cartItems={cartItems} onPay={handlePay} onCancel={handleCancel} />
      </PortalRoot>
    </div>
  );
}

export default Home;