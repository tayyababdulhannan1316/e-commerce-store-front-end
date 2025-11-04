import React from "react"; 
import menfashion from "../../../assets/images/men's fasion.jpg"
import womenfashion from "../../../assets/images/women's fasion.jpg"
import electronics from "../../../assets/images/electronics.jpg"
import accessories from "../../../assets/images/accessories.jpg"

const categories = [
  { name: "Men’s Fashion", img: menfashion },
  { name: "Women’s Fashion", img: womenfashion },
  { name: "Electronics", img: electronics },
  { name: "Accessories", img: accessories },
];

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Featured Categories</h2>
        <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-56 object-cover"
              />
              <h3 className="mt-3 text-lg font-semibold">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
