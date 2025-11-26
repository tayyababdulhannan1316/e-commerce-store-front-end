// src/routes/AppRouter.jsx
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProtectedRoute from "./ProtectedRoute";

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
import MyAccount from "../pages/Frontend/MyAccount";
import Wishlist from "../pages/Frontend/Wishlist/Wishlist";
import FAQ from "../pages/Frontend/FAQ/FAQ";
import NotFound from "../pages/Frontend/NotFound/NotFound";
import Auth from "../pages/Auth";
import DashboardLayout from "../components/DashboardLayout";

// Dashboard Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import Orders from "../pages/Dashboard/Orders";
import UserProfile from "../pages/Dashboard/UserProfile";
import ProductManagement from "../pages/Dashboard/ProductManagement";

export default function AppRouter() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Routes>
          {/* Frontend Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/auth/*" element={<Auth />} />

          {/* Protected Frontend Routes */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myaccount"
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }
          />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="admin"
              element={
                user?.role === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <UserDashboard />
                )
              }
            />
            <Route path="user" element={<UserDashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<Orders />} />
            <Route path="UserProfile" element={<UserProfile />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}





