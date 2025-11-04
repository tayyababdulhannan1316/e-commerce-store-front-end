import React from "react";
import aboutImg from "../../../assets/images/about.jpg"; // add any image you like

function About() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${aboutImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blend-hue bg-opacity-50"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            About ShopEase
          </h1>
          <p className="text-gray-200 mt-3 max-w-2xl mx-auto">
            Discover who we are and what makes us your favorite online shopping destination.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 px-6 md:px-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded with a passion for quality and convenience, ShopEase brings the best
              fashion, electronics, and accessories to your doorstep. We believe shopping
              should be simple, enjoyable, and affordable for everyone.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With thousands of satisfied customers, we’re redefining the online shopping
              experience with reliability, style, and unmatched service.
            </p>
          </div>
          <div>
            <img
              src={aboutImg}
              alt="About Us"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-blue-600 text-white py-16 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="max-w-2xl mx-auto text-gray-100 text-lg leading-relaxed">
          To empower every individual to express their style and make confident choices
          through a seamless online shopping experience. We’re committed to providing
          top-quality products, fast delivery, and exceptional customer service.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Why Choose ShopEase?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-md rounded-2xl hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Quality Products</h3>
            <p className="text-gray-600">
              We carefully select every product to ensure you get the best in quality and style.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-2xl hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Fast Delivery</h3>
            <p className="text-gray-600">
              Enjoy quick and reliable shipping so you can get your favorite items without delay.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-2xl hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">24/7 Support</h3>
            <p className="text-gray-600">
              Our dedicated support team is always ready to help with your queries and concerns.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="bg-gray-100 py-16 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-blue-600">Ali Khan</h3>
            <p className="text-gray-500 text-sm">Founder & CEO</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-blue-600">Sara Ahmed</h3>
            <p className="text-gray-500 text-sm">Marketing Head</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <img
              src="https://randomuser.me/api/portraits/men/76.jpg"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-blue-600">Hassan Raza</h3>
            <p className="text-gray-500 text-sm">Operations Manager</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
