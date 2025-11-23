import React, { createContext, useState, useEffect,useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Initialize user from localStorage immediately to prevent logout on refresh
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("authUser");
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      localStorage.removeItem("authUser"); // Clear invalid data
    }
    return null;
  });

  // ✅ Also sync on mount to handle cases where localStorage is updated externally
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("authUser");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      localStorage.removeItem("authUser");
      setUser(null);
    }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      localStorage.setItem("authUser", JSON.stringify(found));
      setUser(found);
      return true;
    } else {
      return false;
    }
  };

  const register = (name, email, password, role = "user") => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === email);
    if (exists) return false;

    const newUser = { id: Date.now(), name, email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("authUser", JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add this custom hook at the end
export const useAuth = () => {
  return useContext(AuthContext);
};
