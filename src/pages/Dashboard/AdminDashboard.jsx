import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext";

export default function AdminDashboard() {
  const { orders, setOrders } = useCart();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const saveOrders = (updated) => {
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    localStorage.setItem("ordersLastUpdated", new Date().toISOString());
  };

  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    saveOrders(updatedOrders);
    alert(`Order #${id} marked as ${newStatus}`);
  };

  const deleteOrder = (id) => {
    if (!window.confirm("Delete this order permanently?")) return;
    saveOrders(orders.filter((o) => o.id !== id));
  };

  const toggleDetails = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  // Filters + Sorting
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toString().includes(searchTerm.toLowerCase()) ||
        order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "Total") return b.total - a.total;
      if (sortBy === "Oldest") return a.id - b.id;
      return b.id - a.id;
    });

  const stats = {
    total: orders.length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    processing: orders.filter((o) => o.status === "Processing").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
  };

  const lastUpdated = localStorage.getItem("ordersLastUpdated");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex justify-between">
          Admin Dashboard
          <span className="text-sm text-gray-500">
            {lastUpdated && "Last updated: " + new Date(lastUpdated).toLocaleString()}
          </span>
        </h2>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <h4 className="text-blue-600 font-bold text-lg">{stats.total}</h4>
            <p>Total Orders</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg text-center">
            <h4 className="text-green-600 font-bold text-lg">{stats.delivered}</h4>
            <p>Delivered</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <h4 className="text-yellow-600 font-bold text-lg">{stats.processing}</h4>
            <p>Processing</p>
          </div>

          <div className="bg-red-100 p-4 rounded-lg text-center">
            <h4 className="text-red-600 font-bold text-lg">{stats.cancelled}</h4>
            <p>Cancelled</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID or name..."
            className="border px-4 py-2 rounded-lg w-full md:w-1/2"
          />

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="All">All</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Total">By Total</option>
            </select>
          </div>
        </div>

        {/* ORDERS TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">Order ID</th>
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Total</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr
                    onClick={() => toggleDetails(order.id)}
                    className={`border-t hover:bg-gray-50 cursor-pointer ${
                      order.status === "Cancelled" ? "bg-red-50" : ""
                    }`}
                  >
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">{order.customer?.name}</td>
                    <td className="py-2 px-4">Rs {order.total}</td>

                    <td className="py-2 px-4 font-semibold">
                      {order.status}
                    </td>

                    <td className="py-2 px-4 flex gap-2 justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(order.id, "Processing");
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Process
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(order.id, "Delivered");
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Deliver
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(order.id, "Cancelled");
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteOrder(order.id);
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  {/* EXPANDED DETAILS */}
                  {expandedOrder === order.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="5" className="p-4">
                        <h3 className="font-semibold mb-2">Order Items</h3>

                        <table className="w-full mb-4 border text-sm">
                          <thead className="bg-gray-200">
                            <tr>
                              <th className="px-2 py-1">Product</th>
                              <th className="px-2 py-1">Price</th>
                              <th className="px-2 py-1">Qty</th>
                              <th className="px-2 py-1">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, i) => (
                              <tr key={i} className="border-t">
                                <td className="px-2 py-1">{item.name}</td>
                                <td className="px-2 py-1">Rs {item.price}</td>
                                <td className="px-2 py-1">{item.quantity}</td>
                                <td className="px-2 py-1">
                                  Rs {item.price * item.quantity}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <h3 className="font-semibold">Customer Details</h3>
                        <p><b>Name:</b> {order.customer?.name}</p>
                        <p><b>Email:</b> {order.customer?.email}</p>
                        <p><b>Phone:</b> {order.customer?.phone}</p>
                        <p><b>Address:</b> {order.customer?.address}</p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
