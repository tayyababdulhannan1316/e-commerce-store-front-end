import React from 'react';
import {Link} from 'react-router-dom'
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 - Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">ShopEase</h2>
          <p className="text-sm leading-6">
            Your trusted destination for quality fashion, electronics, and more.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/shop" className="hover:text-blue-400">Shop</Link></li>
            <li><Link to="/categories" className="hover:text-blue-400">Categories</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3 - Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-400">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Return Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
          <p className="text-sm mb-3">Subscribe to get exclusive deals & latest updates.</p>
          <form className="flex bg-gray-800 rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none px-3 py-2 text-sm w-full"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 text-white text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center text-sm mt-10 pt-4">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}
