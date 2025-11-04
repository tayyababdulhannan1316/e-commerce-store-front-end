import React from "react";
import smartwatch from "../../../assets/images/smart watch.jpg";
import leatherjacket from "../../../assets/images/leather jacket.jpg";
import wirelessearbuds from "../../../assets/images/Wireless Earbuds.jpg";
import runningshoes from "../../../assets/images/Running Shoes.jpg";
import ProductCard from "../../../components/ProductCard";

const products = [
  { name: "Smart Watch", price: 59.99, img: smartwatch },
  { name: "Leather Jacket", price: 120.0, img: leatherjacket },
  { name: "Wireless Earbuds", price: 39.99, img: wirelessearbuds },
  { name: "Running Shoes", price: 75.5, img: runningshoes },
];

export default function Trending() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Trending Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
