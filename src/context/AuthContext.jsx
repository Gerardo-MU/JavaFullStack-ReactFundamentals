/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
  onRegister: () => {},
});

export const BASE_URL = 'https://react-http-proyect-default-rtdb.firebaseio.com/'

function generateCustomId() {
  // Genera 4 letras aleatorias (A-Z) - 4 números aleatorios
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomLetters = "";
  for (let i = 0; i < 4; i++) {
    randomLetters += letters[Math.floor(Math.random() * letters.length)];
  }

  let randomNumbers = "";
  for (let i = 0; i < 4; i++) {
    randomNumbers += Math.floor(Math.random() * 10);
  }

  return `${randomLetters}-${randomNumbers}`;
}

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    if (isAuthenticated === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // ---------------------------------------
  // Función para obtener el usuario por email
  // ---------------------------------------
  const fetchUser = async (email) => {
    const url = `${BASE_URL}users.json?orderBy="email"&equalTo="${email}"`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Algo salio mal...");
    return response.json();
  };

  // ---------------------------------------
  // Login
  // ---------------------------------------
  const loginHandler = async (email, callback) => {
    try {
      const user = await fetchUser(email);
      const userId = Object.keys(user)[0];
      if (!userId) {
        alert("Correo Invalido");
        throw new Error();
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", userId);
      setIsLoggedIn(true);

      return callback(userId);
    } catch (error) {
      console.log(error.message);
    }
  };

  // ---------------------------------------
  // Logout
  // ---------------------------------------
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  // ---------------------------------------
  // Registro de un nuevo usuario
  // ---------------------------------------
  const onRegister = async (name, lastname, email, password, callback) => {
    try {
      // 1. Revisar si ya existe un usuario con ese correo:
      // Construimos la URL con la consulta: orderBy="email"&equalTo="..."
      const checkUrl = `${BASE_URL}users.json?orderBy="email"&equalTo="${email}"`;

      const checkResponse = await fetch(checkUrl);
      if (!checkResponse.ok) {
        throw new Error("Error al verificar si el usuario ya existe.");
      }

      // data = { userId1: { name, lastname, email, password }, userId2: {...} }
      const data = await checkResponse.json();
      const userKeys = Object.keys(data);

      // Si userKeys tiene length > 0, significa que sí existe un usuario con ese email
      if (userKeys.length > 0) {
        alert("Ya existe un usuario registrado con ese correo.");
        return; // Detenemos la ejecución, no se crea un usuario nuevo
      }

      // 2. Si no existe, generamos un ID y guardamos los datos en Firebase
      const userId = generateCustomId();

      const putResponse = await fetch(`${BASE_URL}users/${userId}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          lastname,
          email,
          password,
        }),
      });

      if (!putResponse.ok) {
        throw new Error("No se pudo registrar al usuario.");
      }

      // 3. Llamamos al callback si se proporcionó
      if (callback) callback(userId);
      setIsLoggedIn(true);

    } catch (error) {
      console.log("Error al registrar:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onRegister: onRegister,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
