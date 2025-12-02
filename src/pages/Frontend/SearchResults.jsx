import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

// Placeholder data - in a real app, this would come from a context or API
import smartwatch from "../../assets/images/smart watch.jpg";
import leatherjacket from "../../assets/images/leather jacket.jpg";
import wirelessearbuds from "../../assets/images/Wireless Earbuds.jpg";
import runningshoes from "../../assets/images/Running Shoes.jpg";

const allProducts = [
  { name: "Smart Watch", price: 59.99, img: smartwatch, category: "Electronics" },
  { name: "Leather Jacket", price: 120.0, img: leatherjacket, category: "Fashion" },
  { name: "Wireless Earbuds", price: 39.99, img: wirelessearbuds, category: "Electronics" },
  { name: "Running Shoes", price: 75.5, img: runningshoes, category: "Sports" },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Search Results for "{query}"
      </h1>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No products found</h2>
          <p className="text-gray-500 mb-6">Try searching for something else or browse our shop.</p>
          <Link to="/shop" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Go to Shop
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
