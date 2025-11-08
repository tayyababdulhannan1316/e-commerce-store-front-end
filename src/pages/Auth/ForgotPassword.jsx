// src/pages/Auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === email);

    if (!existingUser) {
      setError("No account found with this email.");
      return;
    }

    // ✅ For demo: generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    existingUser.password = tempPassword;

    // ✅ Update user in localStorage
    const updatedUsers = users.map((u) =>
      u.email === email ? existingUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setMessage(
      `A temporary password "${tempPassword}" has been generated. Please use it to log in.`
    );

    setTimeout(() => navigate("/auth/login"), 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-950 mb-6">
          Forgot Password
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Enter your registered email to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-3">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-100 text-green-700 p-2 rounded mb-3">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Reset Password
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Remembered your password?{" "}
          <Link
            to="/auth/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
