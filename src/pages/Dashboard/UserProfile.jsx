import React, { useState, useEffect } from "react";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Load saved user info (from localStorage)
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Handle field changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Save updates
  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        My Profile
      </h2>

      <div className="grid gap-4">
        <div>
          <label className="block text-gray-600 mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1 font-medium">Address</label>
          <textarea
            name="address"
            value={user.address}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
