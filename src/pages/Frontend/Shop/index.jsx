import React, { useState } from "react";
import { Button, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext"; 

// ✅ Import Product Images
import product1 from "../../../assets/images/casual shirt.jpg";
import product2 from "../../../assets/images/summer dress.jpg";
import product3 from "../../../assets/images/smart watch2.jpg";
import product4 from "../../../assets/images/sneakers.jpg";
import product5 from "../../../assets/images/handbag.jpg";
import product6 from "../../../assets/images/head phones.jpg";
import product7 from "../../../assets/images/formal shirts.jpg";
import product8 from "../../../assets/images/bluetooth speaker.jpg";

const { Option } = Select;

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart(); 

  const products = [
    { id: 1, name: "Casual Shirt", price: 2499, img: product1, category: "Men" },
    { id: 2, name: "Summer Dress", price: 2999, img: product2, category: "Women" },
    { id: 3, name: "Smart Watch", price: 6499, img: product3, category: "Electronics" },
    { id: 4, name: "Sneakers", price: 4999, img: product4, category: "Men" },
    { id: 5, name: "Handbag", price: 3999, img: product5, category: "Women" },
    { id: 6, name: "Headphones", price: 3499, img: product6, category: "Electronics" },
    { id: 7, name: "Formal Shirt", price: 2799, img: product7, category: "Men" },
    { id: 8, name: "Bluetooth Speaker", price: 1999, img: product8, category: "Electronics" },
  ];

  // ✅ Filter products by category + search term
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 px-6 lg:px-16 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Explore Our Collection
      </h1>

      {/* Search + Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
        <Input
          placeholder="Search products..."
          className="w-full sm:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select
          defaultValue="All"
          className="w-full sm:w-40"
          onChange={(value) => setSelectedCategory(value)}
        >
          <Option value="All">All Categories</Option>
          <Option value="Men">Men</Option>
          <Option value="Women">Women</Option>
          <Option value="Electronics">Electronics</Option>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition-transform hover:-translate-y-1 duration-300"
          >
            <Link to={`/product/${item.id}`}>
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-64 object-cover rounded-t-2xl hover:opacity-90 transition duration-300"
              />
            </Link>

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-500 mt-1">Rs {item.price}</p>

              <Button
                type="primary"
                className="bg-blue-600 hover:bg-blue-700 mt-3 text-white border-none"
                onClick={() => addToCart(item)} 
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No products found.</p>
      )}
    </div>
  );
};

export default Shop;
