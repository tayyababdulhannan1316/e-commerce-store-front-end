import React from 'react';
import { Truck } from 'lucide-react';

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <div className="text-center mb-8">
          <Truck className="mx-auto text-blue-600 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-gray-900">Shipping Policy</h1>
        </div>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Processing Time</h2>
            <p>
              All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
              If we are experiencing a high volume of orders, shipments may be delayed by a few days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Shipping Rates & Delivery Estimates</h2>
            <p>
              Shipping charges for your order will be calculated and displayed at checkout.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Standard Shipping:</strong> 3-5 business days - $5.99</li>
              <li><strong>Express Shipping:</strong> 1-2 business days - $12.99</li>
              <li><strong>Free Shipping:</strong> Orders over $100 - Free</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Shipment Confirmation & Order Tracking</h2>
            <p>
              You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s).
              The tracking number will be active within 24 hours.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. International Shipping</h2>
            <p>
              We currently ship to select countries worldwide. International shipping rates and delivery times vary by location.
              Customs duties and taxes are the responsibility of the customer.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
