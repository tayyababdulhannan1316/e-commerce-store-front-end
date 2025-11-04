import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MyAccount() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load customer info from the latest order in localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    if (savedOrders.length > 0) {
      const latestOrder = savedOrders[savedOrders.length - 1];
      setUser(latestOrder.customer);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("orders");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-16 flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          My Account
        </h1>

        {user ? (
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Personal Details
              </h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
            </div>

            <div className="flex flex-col space-y-3 mt-6">
              <Link
                to="/orderhistory"
                className="bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                View Order History
              </Link>
              <Link
                to="/cart"
                className="bg-gray-800 text-white text-center py-2 rounded-lg font-medium hover:bg-gray-900 transition"
              >
                Go to Cart
              </Link>
              <Link
                to="/shop"
                className="bg-green-600 text-white text-center py-2 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Continue Shopping
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white text-center py-2 rounded-lg font-medium hover:bg-red-700 transition"
              >
                Clear My Data / Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              No account details found. Place an order to save your info.
            </p>
            <Link
              to="/shop"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
