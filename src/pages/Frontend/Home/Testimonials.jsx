import React, { useState, useEffect } from "react";
import imgsarah from "../../../assets/images/sarah.jpg";
import imgali from "../../../assets/images/ali.jpg";
import imgfatima from "../../../assets/images/fatima.jpg";
import imgtalha from "../../../assets/images/talha.jpg";
import imgzara from "../../../assets/images/zara.jpg";
import imghassan from "../../../assets/images/hassan.jpg";
import imgamna from "../../../assets/images/amna.jpg";
import imgumer from "../../../assets/images/umer.jpg";

const reviews = [
  {
    name: "Sarah Ahmed",
    text: "Amazing quality and fast delivery. Highly recommended!",
    img: imgsarah,
  },
  {
    name: "Ali Khan",
    text: "Great experience. The products are exactly as shown.",
    img: imgali,
  },
  {
    name: "Fatima Noor",
    text: "Customer support was so helpful and friendly. Love it!",
    img: imgfatima,
  },
  {
    name: "Talha Raza",
    text: "The prices are great and delivery was on time. Will shop again!",
    img: imgtalha,
  },
  {
    name: "Zara Malik",
    text: "Absolutely love the variety! The website is easy to use.",
    img: imgzara,
  },
  {
    name: "Hassan Javed",
    text: "Excellent packaging and timely delivery. Five stars!",
    img: imghassan,
  },
  {
    name: "Amna Rehman",
    text: "The material quality exceeded my expectations. Highly impressed!",
    img: imgamna,
  },
  {
    name: "Umer Farooq",
    text: "My go-to store for all essentials. Great experience every time.",
    img: imgumer,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // group reviews into pairs of two
  const pairs = [];
  for (let i = 0; i < reviews.length; i += 2) {
    pairs.push(reviews.slice(i, i + 2));
  }

  // auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % pairs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [pairs.length]);

  return (
    <section className="py-16 bg-gray-50 text-center overflow-hidden">
      <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>

      <div className="flex justify-center overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
            width: `${pairs.length * 100}%`,
          }}
        >
          {pairs.map((group, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row justify-center gap-6 w-full flex-shrink-0 px-6"
              style={{ width: "100%" }}
            >
              {group.map((r, j) => (
                <div
                  key={j}
                  className="bg-white shadow-lg rounded-xl p-6 max-w-sm mx-auto"
                >
                  <p className="italic text-gray-600 mb-4">“{r.text}”</p>
                  <div className="flex items-center justify-center gap-3">
                    <img
                      src={r.img}
                      alt={r.name}
                      className="w-40 h-40 rounded-full object-cover"
                    />
                    <h4 className="font-semibold">{r.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-6 gap-2">
        {pairs.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
