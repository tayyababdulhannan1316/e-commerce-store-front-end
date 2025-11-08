// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Frontend Pages
import Home from "../pages/Frontend/Home";
import Shop from "../pages/Frontend/Shop";
import Categories from "../pages/Frontend/Categories";
import About from "../pages/Frontend/About";
import Contact from "../pages/Frontend/Contact";
import ProductDetail from "../pages/Frontend/ProductDetail";
import Cart from "../pages/Frontend/Cart";
import Checkout from "../pages/Frontend/Checkout";
import OrderSuccess from "../pages/Frontend/OrderSuccess";
import OrderHistory from "../pages/Frontend/OrderHistory";
import MyAccount from "../pages/Frontend/MyAccount";
import Auth from "../pages/Auth/index.jsx";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import AdminDashboard from "../pages/Dashboard/AdminDashboard.jsx";

export default function AppRouter() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />         
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/checkout" element={<ProtectedRoute> <Checkout /> </ProtectedRoute> } />
          <Route path="/myaccount" element={<ProtectedRoute> <MyAccount /> </ProtectedRoute>} />          
          <Route path="/orderhistory" element={<ProtectedRoute> <OrderHistory /> </ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute> } />
          <Route path="/dashboard/admin" element={<ProtectedRoute> <AdminDashboard /></ProtectedRoute> }/>

        </Routes>
      </main>
      <Footer />
    </>
  );
}
