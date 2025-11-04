import React from "react";
import bannerImg from "../../../assets/images/baner.jpg";

export default function Banner() {
  return (
    <section
      className="my-16 bg-cover bg-center h-200 overflow-hidden flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* <div className="bg-black bg-opacity-50 text-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-3">Big Sale — Up to 50% Off!</h2>
        <p className="text-sm mb-4">Don’t miss this exclusive offer.</p>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full">
          Shop Now
        </button>
      </div> */}
    </section>
  );
}
