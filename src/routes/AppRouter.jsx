// src/routes/AppRouter.jsx
import React, { useContext } from "react";
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
import OrderHistory from "../pages/Frontend/OrderHistory";
import MyAccount from "../pages/Frontend/MyAccount";
import Auth from "../pages/Auth";
import DashboardLayout from "../components/DashboardLayout";

// Dashboard Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard";

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
          <Route
            path="/orderhistory"
            element={
              <ProtectedRoute>
                <OrderHistory />
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
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}









// import React, { useContext } from "react";
// import { Routes, Route } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { AuthContext } from "../contexts/AuthContext";

// // Frontend Pages
// import Home from "../pages/Frontend/Home";
// import Shop from "../pages/Frontend/Shop";
// import Categories from "../pages/Frontend/Categories";
// import About from "../pages/Frontend/About";
// import Contact from "../pages/Frontend/Contact";
// import ProductDetail from "../pages/Frontend/ProductDetail";
// import Cart from "../pages/Frontend/Cart";
// import Checkout from "../pages/Frontend/Checkout";
// import OrderSuccess from "../pages/Frontend/OrderSuccess";
// import OrderHistory from "../pages/Frontend/OrderHistory";
// import MyAccount from "../pages/Frontend/MyAccount";
// import Auth from "../pages/Auth";
// import ProtectedRoute from "./ProtectedRoute";

// // Dashboards
// import AdminDashboard from "../pages/Dashboard/AdminDashboard";
// import UserDashboard from "../pages/Dashboard/UserDashboard";
// import DashboardLayout from "../components/DashboardLayout";

// export default function AppRouter() {
//   const { user } = useContext(AuthContext);

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/shop" element={<Shop />} />
//           <Route path="/categories" element={<Categories />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/product/:id" element={<ProductDetail />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/ordersuccess" element={<OrderSuccess />} />
//           <Route path="/auth/*" element={<Auth />} />

//           {/* Protected Routes */}
//           <Route
//             path="/checkout"
//             element={
//               <ProtectedRoute>
//                 <Checkout />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/myaccount"
//             element={
//               <ProtectedRoute>
//                 <MyAccount />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/orderhistory"
//             element={
//               <ProtectedRoute>
//                 <OrderHistory />
//               </ProtectedRoute>
//             }
//           />

//           {/* Role-based Dashboard */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <DashboardLayout>
//                   {user?.role === "admin" ? (
//                     <AdminDashboard />
//                   ) : (
//                     <UserDashboard />
//                   )}
//                 </DashboardLayout>
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </main>
//       <Footer />
//     </>
//   );
// }




// import React , {useContext} from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { Routes, Route } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// // Frontend Pages
// import Home from "../pages/Frontend/Home";
// import Shop from "../pages/Frontend/Shop";
// import Categories from "../pages/Frontend/Categories";
// import About from "../pages/Frontend/About";
// import Contact from "../pages/Frontend/Contact";
// import ProductDetail from "../pages/Frontend/ProductDetail";
// import Cart from "../pages/Frontend/Cart";
// import Checkout from "../pages/Frontend/Checkout";
// import OrderSuccess from "../pages/Frontend/OrderSuccess";
// import OrderHistory from "../pages/Frontend/OrderHistory";
// import MyAccount from "../pages/Frontend/MyAccount";
// import Auth from "../pages/Auth/index.jsx";
// import ProtectedRoute from "./ProtectedRoute";
// import Dashboard from "../pages/Dashboard/Dashboard.jsx";
// import AdminDashboard from "../pages/Dashboard/AdminDashboard.jsx";
// import UserDashboard from "../pages/Dashboard/UserDashboard.jsx";
// import DashboardLayout from "../components/DashboardLayout.jsx";

// export default function AppRouter() {
//   const { user } = useContext(AuthContext);
//   return (
//     <>
//       <Header />
//       <main className="min-h-screen">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/shop" element={<Shop />} />
//           <Route path="/categories" element={<Categories />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/product/:id" element={<ProductDetail />} />
//           <Route path="/cart" element={<Cart />} />         
//           <Route path="/ordersuccess" element={<OrderSuccess />} />
//           <Route path="/auth/*" element={<Auth />} />
//           <Route path="/checkout" element={<ProtectedRoute> <Checkout /> </ProtectedRoute> } />
//           <Route path="/myaccount" element={<ProtectedRoute> <MyAccount /> </ProtectedRoute>} />          
//           <Route path="/orderhistory" element={<ProtectedRoute> <OrderHistory /> </ProtectedRoute>} />
//           <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute> } />
//           <Route path="/dashboard/admin" element={<ProtectedRoute> <AdminDashboard /></ProtectedRoute> }/>
//           <Route path="/dashboard/*" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute> }/>
//           <Route path="/dashboard" element={<ProtectedRoute>
//           {user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />} </ProtectedRoute> }/>

//         </Routes>
//       </main>
//       <Footer />
//     </>
//   );
// }
