import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardLayout() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Dashboard
          </h2>
          <nav className="flex flex-col space-y-3 text-gray-700">
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
            >
              My Orders
            </Link>
            <Link
              to="/dashboard/profile"
              className="px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition mt-6"
            >
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
