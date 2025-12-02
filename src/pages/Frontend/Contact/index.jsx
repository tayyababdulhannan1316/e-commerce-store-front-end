import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const saved = JSON.parse(localStorage.getItem("messages") || "[]");

    const newMsg = { id: Date.now(), ...form };

    localStorage.setItem("messages", JSON.stringify([...saved, newMsg]));

    alert("Message sent successfully!");

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="bg-white shadow-xl p-8 rounded-xl max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full border p-3 rounded mb-4"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full border p-3 rounded mb-4"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            placeholder="Your Message"
            required
            rows="5"
            className="w-full border p-3 rounded mb-4"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
