import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // ✅ Update Order Status
  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // ✅ Mark Order as Delivered
  const markAsDelivered = (id) => {
    updateStatus(id, "Delivered");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          🧑‍💼 Admin Dashboard
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">No orders available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">Order ID</th>
                  <th className="py-2 px-4">Customer</th>
                  <th className="py-2 px-4">Total</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">{order.name}</td>
                    <td className="py-2 px-4">${order.total}</td>
                    <td className="py-2 px-4">{order.status}</td>
                    <td className="py-2 px-4 flex justify-center gap-2">
                      <button
                        onClick={() => updateStatus(order.id, "Processing")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Update Status
                      </button>
                      <button
                        onClick={() => markAsDelivered(order.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Mark as Delivered
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
