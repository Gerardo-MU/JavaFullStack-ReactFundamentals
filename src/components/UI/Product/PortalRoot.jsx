import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function PortalRoot({ children }) {
  // Estado que guardará la referencia al <div> que se crea
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    //Crear un elemento <div> (o <section>, etc.)
    const node = document.createElement("div");
    node.id = "portal-root"; //Para identificarlo
    
    document.body.appendChild(node);

    //Guardar la referencia en el estado
    setPortalNode(node);

    //Remover el div cuando el componente se desmonte 
    return () => {
      document.body.removeChild(node);
    };
  }, []);

  // Hasta que portalNode sea creado, no podemos hacer createPortal
  if (!portalNode) return null;

  // Retorna el Portal con los children en el nodo 
  return createPortal(children, portalNode);
}
