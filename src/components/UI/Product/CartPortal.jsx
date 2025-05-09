import ReactDOM from "react-dom";

function CartPortal({ children }) {
  const portalRoot = document.getElementById("portal-root");
  return ReactDOM.createPortal(children, portalRoot);
}

export default CartPortal;
