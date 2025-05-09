# Proyecto: ***Panadería Online***

**Diplomado en Programación Java:** JavaScript

**Insignia electrónica:** clic [aquí](https://www.acreditta.com/credential/09f099c3-ad68-4af8-bbca-8348f3a40db4) 

---

## Objetivo
Desarrollar un sitio web dinámico que utilice REACT para el diseño de componentes, utilar CSS Moldules para un sitio responsivo, implementar pruebas unitarias para pruebas de componentes y utilizar React Router para la navegación del sitio.

## Tecnologías utilizadas
- **React**
- **Vite**
- **CSS Modules** y **SASS** para sitio responsivo
- **React Portals** para modelar clases y funciones
- **Vitest** para prueba de componentes

## Descripción

Este proyecto consiste en una Panadería online que permite realizar la autentificación de usuarios, así como el registro de usuarios nuevos, para ello se implementa una conexión a un servivio de nube de Google Firtebase para conectar con una base de datos que almacene cada uno de los registro.

Las vistas de los componentes del sitio funciona sobre React Router que permite gestinoar cada una de las rutas, así como evitar rutas inexistentes. 

En la página se selección de producto, cada uno tiene como base un componente que contiene imagen, nombre, precio y botón "Agregar" el cual sera agregado al "carrito" en la parte inferior de la página el cual implemnta un Portal que se fija en la interfaz.

Adicionalmente se utiliza la librería de Vitest para realizar pruebas unitarias del funcionamiento de alguno de los componetes.

## Vista previa
A continuación se presentan las siguientes pantallas de las principales páginas del sitio.

**Página de Inicio**

![Página de inicio](https://raw.githubusercontent.com/Gerardo-MU/JavaFullStack-ReactFundamentals/refs/heads/master/public/screenshots/sc1.png)


**Login**

![Login](https://raw.githubusercontent.com/Gerardo-MU/JavaFullStack-ReactFundamentals/refs/heads/master/public/screenshots/sc2.png)


**Registro**

![Registro](https://raw.githubusercontent.com/Gerardo-MU/JavaFullStack-ReactFundamentals/refs/heads/master/public/screenshots/sc3.png)


**Menú de productos**

![Productos](https://raw.githubusercontent.com/Gerardo-MU/JavaFullStack-ReactFundamentals/refs/heads/master/public/screenshots/sc4.png)



**Confirmación de Orden**

![Orden de productos](https://raw.githubusercontent.com/Gerardo-MU/JavaFullStack-ReactFundamentals/refs/heads/master/public/screenshots/sc5.png)


**Firebase**

En esta pantalla se muestra alguno de los registros de la base remota potenciada por Google Firebase [Google Firebase](https://console.firebase.google.com/project/react-http-proyect/database/react-http-proyect-default-rtdb/data) el cual se utiliza para autentificar los usuarios, así como registrar nuevos

![firebase](https://raw.githubusercontent.com/Gerardo-MU/JavaFullStack-ReactFundamentals/refs/heads/master/public/screenshots/sc6.png)