import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext"; 

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // ✅ Get logged-in user
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

 const [orders, setOrders] = useState(() => {
   // ✅ Initialize from localStorage immediately
   const savedOrders = localStorage.getItem("orders");
   return savedOrders ? JSON.parse(savedOrders) : [];
 });

 // ✅ Sync orders from localStorage on mount and when user changes
 useEffect(() => {
   try {
     const savedOrdersStr = localStorage.getItem("orders");
     const savedOrders = savedOrdersStr ? JSON.parse(savedOrdersStr) : [];
     setOrders(savedOrders);
   } catch (error) {
     console.error("Error loading orders from localStorage:", error);
     setOrders([]);
   }
 }, [user?.id]); // Re-sync when user changes (login/logout)


  // ✅ Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Persist orders to localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ✅ Add item to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // ✅ Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Update quantity (increase/decrease)
  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  // ✅ Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const addOrder = (form, subtotal, cartItems) => {
  const newOrder = {
    id: Date.now(),
    date: new Date().toISOString(),
    userId: user?.id || null,
    userEmail: user?.email || form.email,

    customer: {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
    },

    items: cartItems.map((item) => ({
      id: item.id,
      name: item.name || item.title || "Product",
      price: item.price,
      quantity: item.quantity,
    })),

    total: subtotal,
    status: "Processing",
  };

  setOrders((prev) => {
    const updated = [...prev, newOrder];
    localStorage.setItem("orders", JSON.stringify(updated));
    // ✅ Dispatch custom event to notify other components (like AdminDashboard) of new order
    window.dispatchEvent(new CustomEvent("ordersUpdated", { detail: updated }));
    return updated;
  });

  clearCart();
};


  // ✅ Totals
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        orders,
        addOrder,
        setOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

