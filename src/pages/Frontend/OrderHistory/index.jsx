import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  // ✅ Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // ✅ Save updated orders to localStorage
  const saveOrders = (updatedOrders) => {
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // ✅ Update order status (Admin simulation)
  const updateOrderStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    saveOrders(updatedOrders);
  };

  // ✅ Generate Invoice PDF
  const downloadInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("ShopEase Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 14, 32);
    doc.text(`Date: ${new Date(order.date).toLocaleString()}`, 14, 40);
    doc.text(`Customer: ${order.customer.name}`, 14, 48);
    doc.text(`Address: ${order.customer.address}`, 14, 56);
    doc.text(`Phone: ${order.customer.phone}`, 14, 64);

    let y = 78;
    doc.setFontSize(13);
    doc.text("Items:", 14, y);
    y += 8;

    order.items.forEach((item, i) => {
      doc.text(
        `${i + 1}. ${item.name} × ${item.quantity} — Rs ${
          item.price * item.quantity
        }`,
        20,
        y
      );
      y += 8;
    });

    y += 6;
    doc.setFontSize(14);
    doc.text(`Total: Rs ${order.total}`, 14, y);
    doc.setFontSize(11);
    doc.text(`Status: ${order.status || "Processing"}`, 14, y + 10);

    doc.save(`invoice_${order.id}.pdf`);
  };

  // ✅ No Orders Found UI
  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-700">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076508.png"
          alt="No Orders"
          className="w-32 mb-6 opacity-80"
        />
        <h2 className="text-2xl font-semibold mb-2">No Orders Found</h2>
        <p className="text-gray-500 mb-6">You haven’t placed any orders yet.</p>
        <a
          href="/shop"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  // ✅ Orders Display
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Order History</h1>

      <div className="grid gap-6">
        {orders
          .slice()
          .reverse()
          .map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex flex-wrap justify-between items-center border-b pb-3 mb-4">
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    Order #{order.id}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Placed on {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-blue-600 font-semibold text-lg block">
                    Rs {order.total}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status || "Processing"}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="mb-4">
                <p className="text-gray-700">
                  <strong>Customer:</strong> {order.customer.name}
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> {order.customer.address}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {order.customer.phone}
                </p>
              </div>

              {/* Items */}
              <h3 className="font-semibold mb-2 text-gray-800">
                Items Ordered:
              </h3>
              <ul className="divide-y">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between py-2 text-gray-700"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>Rs {item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-5">
                <button
                  onClick={() => downloadInvoice(order)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Download Invoice
                </button>

                {/* ✅ Update Status Buttons (Admin Demo) */}
                <button
                  onClick={() => updateOrderStatus(order.id, "Delivered")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Mark as Delivered
                </button>

                <button
                  onClick={() => updateOrderStatus(order.id, "Cancelled")}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Cancel Order
                </button>

                <button
                  onClick={() => updateOrderStatus(order.id, "Processing")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Update Status
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
