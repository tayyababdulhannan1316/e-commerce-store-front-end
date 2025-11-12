import React, { useState } from "react";
import { ShoppingCart, User, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <header className="bg-gray-900 text-gray-300 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-3">
        {/* ✅ First Row: Logo + Nav + Auth */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-white hover tracking-tight"
          >
            ShopEase
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8 text-white font-medium">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/shop" className="hover:text-blue-600">
              Shop
            </Link>
            <Link to="/categories" className="hover:text-blue-600">
              Categories
            </Link>
            <Link to="/dashboard/orders" className="hover:text-blue-600">
              Orders
            </Link>
            <Link to="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>

            {/* ✅ Auth Buttons */}
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-3 py-1.5 rounded-lg hover:bg-red-700 text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="hover:text-blue-600">
                  Login
                </Link>
                <Link to="/auth/register" className="hover:text-blue-600">
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-gray-300"></span>
              <span className="block w-6 h-0.5 bg-gray-300"></span>
              <span className="block w-6 h-0.5 bg-gray-300"></span>
            </div>
          </button>
        </div>

        {/* ✅ Second Row: Search + Cart + Account (closer together) */}
        <div className="flex justify-stretch items-center mt-5 flex-wrap gap-3">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-full md:w-2/3">
            <Search className="text-gray-500" size={30} />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent outline-none text-sm ml-2 w-full text-gray-800"
            />
          </div>

          {/* Cart + User Icon (closer to search bar) */}
          <div className="flex items-center space-x-5 md:ml-2">
            <Link to="/cart" className="relative">
              <ShoppingCart
                className="text-gray-300 hover:text-blue-500"
                size={22}
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1.5">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link to={user ? "/myaccount" : "/auth/login"}>
              <User className="text-gray-300 hover:text-blue-500 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="p-4">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 mb-4">
              <Search className="text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm ml-2 w-full"
              />
            </div>

            <nav className="flex flex-col space-y-2 text-gray-700 font-medium">
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
              <Link to="/shop" className="hover:text-blue-600">
                Shop
              </Link>
              <Link to="/categories" className="hover:text-blue-600">
                Categories
              </Link>
              <Link to="/dashboard/orders" className="hover:text-blue-600">
                Orders
              </Link>
              <Link to="/about" className="hover:text-blue-600">
                About
              </Link>
              <Link to="/contact" className="hover:text-blue-600">
                Contact
              </Link>
              <Link to="/cart" className="hover:text-blue-600">
                Cart
              </Link>

              {user ? (
                <>
                  <Link to="/dashboard" className="hover:text-blue-600">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth/login" className="hover:text-blue-600">
                    Login
                  </Link>
                  <Link to="/auth/register" className="hover:text-blue-600">
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
