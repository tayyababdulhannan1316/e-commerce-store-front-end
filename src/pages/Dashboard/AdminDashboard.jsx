import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext"; 

export default function AdminDashboard() {
  const { orders, setOrders } = useCart(); 
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // ✅ Save orders helper
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
    alert(`Order #${id} status updated to ${newStatus}`);
  };

  const markAsDelivered = (id) => updateStatus(id, "Delivered");
  const cancelOrder = (id) => updateStatus(id, "Cancelled");

  const deleteOrder = (id) => {
    if (
      window.confirm("Are you sure you want to permanently delete this order?")
    ) {
      const updatedOrders = orders.filter((order) => order.id !== id);
      saveOrders(updatedOrders);
      alert(`Order #${id} deleted successfully`);
    }
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
      return b.id - a.id; // Default Newest
    });

  const stats = {
    total: orders.length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    pending: orders.filter((o) => o.status === "Pending").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
  };

  const lastUpdated = localStorage.getItem("ordersLastUpdated");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-between">
          Admin Dashboard
          {lastUpdated && (
            <span className="text-sm text-gray-500">
              Last updated: {new Date(lastUpdated).toLocaleString()}
            </span>
          )}
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <h4 className="text-blue-600 font-bold text-lg">{stats.total}</h4>
            <p className="text-gray-600 text-sm">Total Orders</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <h4 className="text-green-600 font-bold text-lg">
              {stats.delivered}
            </h4>
            <p className="text-gray-600 text-sm">Delivered</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <h4 className="text-yellow-600 font-bold text-lg">
              {stats.pending}
            </h4>
            <p className="text-gray-600 text-sm">Pending</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg text-center">
            <h4 className="text-red-600 font-bold text-lg">
              {stats.cancelled}
            </h4>
            <p className="text-gray-600 text-sm">Cancelled</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
          <input
            type="text"
            placeholder="🔍 Search by ID or Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2"
          />

          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Total">By Total</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            <p>No orders found.</p>
          </div>
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
                {filteredOrders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr
                      className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleDetails(order.id)}
                    >
                      <td className="py-2 px-4">{order.id}</td>
                      <td className="py-2 px-4">
                        {order.customer?.name || "Unknown"}
                      </td>
                      <td className="py-2 px-4">Rs {order.total.toFixed(2)}</td>
                      <td
                        className={`py-2 px-4 font-semibold ${
                          order.status === "Delivered"
                            ? "text-green-600"
                            : order.status === "Cancelled"
                            ? "text-red-600"
                            : order.status === "Processing"
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {order.status || "Pending"}
                      </td>
                      <td className="py-2 px-4 flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatus(order.id, "Processing");
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Update
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsDelivered(order.id);
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Delivered
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelOrder(order.id);
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteOrder(order.id);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>

                    {expandedOrder === order.id && (
                      <tr className="bg-gray-50">
                        <td colSpan="5" className="p-4">
                          <div className="border-t border-gray-200 mt-2 pt-3">
                            <h3 className="font-semibold text-gray-700 mb-2">
                              🛍️ Order Items:
                            </h3>
                            <table className="w-full text-sm border border-gray-200 mb-3">
                              <thead>
                                <tr className="bg-gray-200">
                                  <th className="py-1 px-2">Product</th>
                                  <th className="py-1 px-2">Price</th>
                                  <th className="py-1 px-2">Qty</th>
                                  <th className="py-1 px-2">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.items.map((item, i) => (
                                  <tr
                                    key={i}
                                    className="border-t border-gray-200"
                                  >
                                    <td className="py-1 px-2">{item.name}</td>
                                    <td className="py-1 px-2">
                                      Rs {item.price}
                                    </td>
                                    <td className="py-1 px-2">
                                      {item.quantity}
                                    </td>
                                    <td className="py-1 px-2">
                                      Rs{" "}
                                      {(item.price * item.quantity).toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            <div>
                              <h3 className="font-semibold text-gray-700">
                                👤 Customer Details:
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                <strong>Name:</strong>{" "}
                                {order.customer?.name || "N/A"}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Phone:</strong>{" "}
                                {order.customer?.phone || "N/A"}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Address:</strong>{" "}
                                {order.customer?.address || "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

