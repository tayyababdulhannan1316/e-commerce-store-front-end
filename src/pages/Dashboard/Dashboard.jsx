import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">
          Welcome, {user?.name || "User"} 👋
        </h2>
        <p className="text-gray-600 mb-6">
          You are logged in as <span className="font-medium">{user?.role}</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/dashboard/orders"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center"
          >
            View My Past Orders
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/dashboard/admin"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center"
            >
              Admin Panel
            </Link>
          )}

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
