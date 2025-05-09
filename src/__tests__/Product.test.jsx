import { describe, it, expect, beforeEach,vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Importamos el componente que vamos a testear
import Product from "../components/UI/Product/Product";

describe("Product component", () => {
  // Datos de ejemplo
  const mockProduct = {
    id: 1,
    name: "Pan Integral",
    price: 25,
    imageUrl: "/images/pan1.jpg",
  };

  // Mock de la función onAdd
  let onAddMock;

  beforeEach(() => {
    onAddMock = vi.fn();
    render(<Product product={mockProduct} onAdd={onAddMock} />);
  });


  it("Llama a onAdd cuando se hace click en el botón 'Agregar'", () => {
    // Localizamos el botón por su texto
    const addButton = screen.getByText("Agregar");

    // Disparamos el evento de click
    fireEvent.click(addButton);

    // Verificamos que onAdd se haya llamado exactamente una vez
    expect(onAddMock).toHaveBeenCalledTimes(1);

    // Verificamos que reciba el objeto de producto como argumento
    expect(onAddMock).toHaveBeenCalledWith(mockProduct);
  });
});
