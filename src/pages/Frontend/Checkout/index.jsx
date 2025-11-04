import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";
import { message } from "antd";

export default function Checkout() {
  const { cartItems, subtotal, addOrder } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address) {
      message.warning("Please fill all fields before placing order");
      return;
    }

    // ✅ Save order using context (passing form, subtotal, cartItems)
    addOrder(form, subtotal, cartItems);

    message.success("Order placed successfully!");
    navigate("/ordersuccess");
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/shop")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Checkout Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Checkout Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Address
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your full address"
                rows="3"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Order Summary
          </h2>

          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-3">
                <span className="text-gray-700">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-gray-900">
                  Rs {item.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span className="text-blue-600">Rs {subtotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
