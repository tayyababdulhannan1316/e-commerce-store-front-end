import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext"; // ✅ Import auth context to link user

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // ✅ Get logged-in user
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

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

  // ✅ Add new order (called from Checkout)
  const addOrder = (form, subtotal, cartItems) => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      userId: user?.id || null,
      userEmail: user?.email || form.email, // fallback if guest
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
      },
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: subtotal,
      status: "Processing",
    };

    // ✅ Add to state & localStorage instantly
    setOrders((prev) => {
      const updated = [...prev, newOrder];
      localStorage.setItem("orders", JSON.stringify(updated));
      return updated;
    });

    // ✅ Clear cart after successful order
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

// import React, { createContext, useState, useContext, useEffect } from "react";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   // ✅ Load cart from localStorage
//   const [cartItems, setCartItems] = useState(() => {
//     const saved = localStorage.getItem("cartItems");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ✅ Load orders from localStorage
//   const [orders, setOrders] = useState(() => {
//     const saved = localStorage.getItem("orders");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ✅ Persist cart to localStorage
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // ✅ Persist orders to localStorage
//   useEffect(() => {
//     localStorage.setItem("orders", JSON.stringify(orders));
//   }, [orders]);

//   // ✅ Add item to cart
//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const existing = prev.find((item) => item.id === product.id);
//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   // ✅ Remove item from cart
//   const removeFromCart = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   // ✅ Update item quantity
//   const updateQuantity = (id, type) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               quantity:
//                 type === "increase"
//                   ? item.quantity + 1
//                   : item.quantity > 1
//                   ? item.quantity - 1
//                   : 1,
//             }
//           : item
//       )
//     );
//   };

//   // ✅ Clear entire cart
//   const clearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem("cartItems");
//   };

//   // ✅ Add new order (called from Checkout page)
//   const addOrder = (form, subtotal, cartItems) => {
//     const newOrder = {
//       id: Date.now(),
//       date: new Date().toISOString(),
//       customer: {
//         name: form.name,
//         phone: form.phone,
//         address: form.address,
//       },
//       items: cartItems.map((item) => ({
//         id: item.id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//       })),
//       total: subtotal,
//       status: "Processing", // optional for later enhancement
//     };

//     // ✅ Add new order to orders list and clear cart
//     setOrders((prev) => [...prev, newOrder]);
//     clearCart();
//   };

//   // ✅ Calculations
//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         totalItems,
//         subtotal,
//         orders,
//         addOrder,
//         setOrders, // ✅ for future admin or user order updates
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
