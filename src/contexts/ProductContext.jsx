import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {   // <-- changed! (named export)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  return (
    <ProductContext.Provider value={{ products, setProducts: saveProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

