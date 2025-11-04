import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import successImg from "../../../assets/images/success.jpg";

export default function OrderSuccess() {
  const [orderDetails, setOrderDetails] = useState(null);

  // ✅ Fetch order details saved temporarily from checkout
  useEffect(() => {
    const savedOrder = localStorage.getItem("latestOrder");
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
      localStorage.removeItem("latestOrder"); // clean up after showing
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full">
        <img
          src={
            successImg ||
            "https://cdn.dribbble.com/users/2049551/screenshots/5577823/order_4x.png"
          }
          alt="Order Success"
          className="w-24 mx-auto mb-6"
        />

        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with <span className="font-semibold">ShopEase</span>!  
          Your order is being processed and you’ll receive updates soon.
        </p>

        {/* ✅ Show Order Summary if available */}
        {orderDetails && (
          <div className="bg-gray-50 p-4 rounded-lg text-left text-sm mb-6 border">
            <p className="text-gray-800 font-semibold mb-1">
              Order ID: <span className="text-blue-600">#{orderDetails.id}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Name:</span> {orderDetails.name}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Total:</span> Rs {orderDetails.subtotal}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/shop"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-medium"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg transition font-medium"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
