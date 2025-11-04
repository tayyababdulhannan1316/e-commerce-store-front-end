import React from "react";
import { Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ added useNavigate
import { useCart } from "../../../contexts/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate(); // ✅ initialize navigate

  // ✅ Function to handle checkout button
  const handleCheckout = () => {
    navigate("/checkout"); // go to checkout page
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6 md:px-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>

      {/* ✅ Empty Cart Section */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-40 mb-6 opacity-80"
          />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven’t added anything to your cart yet.
          </p>
          <Link
            to="/shop"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          {/* ✅ Cart Items */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.img || item.image} // ✅ image fix
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-blue-600 font-medium">
                      Rs. {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, "decrease")}
                      className="px-2 text-gray-600 hover:text-blue-600"
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, "increase")}
                      className="px-2 text-gray-600 hover:text-blue-600"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Summary Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-800 border-t pt-3">
              <span>Total</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>

            {/* ✅ Updated button */}
            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-medium"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/shop"
              className="block mt-4 text-blue-600 hover:underline text-center"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
