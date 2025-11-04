import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Rate, message } from "antd";
import { useCart } from "../../../contexts/CartContext";

// Static product data (later replace with MongoDB)
import product1 from "../../../assets/images/casual shirt.jpg";
import product2 from "../../../assets/images/summer dress.jpg";
import product3 from "../../../assets/images/smart watch2.jpg";
import product4 from "../../../assets/images/sneakers.jpg";
import product5 from "../../../assets/images/handbag.jpg";
import product6 from "../../../assets/images/head phones.jpg";
import product7 from "../../../assets/images/formal shirts.jpg";
import product8 from "../../../assets/images/bluetooth speaker.jpg";

const products = [
  { id: 1, name: "Casual Shirt", price: 2499, img: product1, desc: "Comfortable cotton shirt perfect for daily wear.", category: "Men" },
  { id: 2, name: "Summer Dress", price: 2999, img: product2, desc: "Lightweight floral dress ideal for hot summer days.", category: "Women" },
  { id: 3, name: "Smart Watch", price: 6499, img: product3, desc: "Track fitness, sleep, and receive notifications easily.", category: "Electronics" },
  { id: 4, name: "Sneakers", price: 4999, img: product4, desc: "Stylish and comfortable sneakers for everyday use.", category: "Men" },
  { id: 5, name: "Handbag", price: 3999, img: product5, desc: "Elegant handbag crafted with premium materials.", category: "Women" },
  { id: 6, name: "Headphones", price: 3499, img: product6, desc: "High-quality sound with noise cancellation feature.", category: "Electronics" },
  { id: 7, name: "Formal Shirt", price: 2799, img: product7, desc: "Stylish formal shirt for business and special occasions.", category: "Men" },
  { id: 8, name: "Bluetooth Speaker", price: 1999, img: product8, desc: "Portable speaker with excellent sound quality and battery life.", category: "Electronics" },
];

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-700">Product not found</h2>
        <Button type="primary" className="mt-4 bg-blue-600" onClick={() => navigate("/shop")}>
          Go Back to Shop
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      message.info(`${product.name} quantity increased in cart.`);
    } else {
      message.success(`${product.name} added to cart!`);
    }
    addToCart(product);
    setAdded(true);
  };

  return (
    <div className="py-12 px-6 lg:px-20 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <div>
          <img
            src={product.img}
            alt={product.name}
            className="rounded-2xl w-full object-cover shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <Rate allowHalf defaultValue={4.5} className="mb-3" />
          <p className="text-gray-600 mb-4">{product.desc}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-6">Rs {product.price}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            {!added ? (
              <Button
                type="primary"
                size="large"
                className="bg-blue-600 hover:bg-blue-700 border-none"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                type="default"
                size="large"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </Button>
            )}
            <Button
              size="large"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => navigate("/shop")}
            >
              Back to Shop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
