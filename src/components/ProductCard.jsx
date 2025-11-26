import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 cursor-pointer transition-transform duration-300 bg-white">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4 text-left">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
