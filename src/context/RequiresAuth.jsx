import { useContext } from "react";
import AuthContext from "./AuthContext";
import { useLocation, Navigate } from 'react-router-dom';


const RequireAuth = ({ children }) => {

    //Declaración de los estados
    const { isLoggedIn } = useContext(AuthContext); //Obtiene la propiedad de AuthContext
    const location = useLocation() //Obtiene la locacion

    // Si no está logeado
    if (!isLoggedIn) {
        //Se moverá a la página de Login desde culauier página donde esté y lo reemplaza
        return <Navigate to='/login' state={{from: location}} replace />
    }
    //De lo contrario, permique que continue donde está
    return children;

}

export default RequireAuth;