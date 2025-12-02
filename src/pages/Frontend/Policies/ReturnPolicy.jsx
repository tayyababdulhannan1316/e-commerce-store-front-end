import React from 'react';
import { RefreshCw } from 'lucide-react';

const ReturnPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <div className="text-center mb-8">
          <RefreshCw className="mx-auto text-blue-600 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-gray-900">Return Policy</h1>
        </div>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Returns</h2>
            <p>
              You have 30 calendar days to return an item from the date you received it.
              To be eligible for a return, your item must be unused and in the same condition that you received it.
              Your item must be in the original packaging.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Refunds</h2>
            <p>
              Once we receive your item, we will inspect it and notify you that we have received your returned item.
              We will immediately notify you on the status of your refund after inspecting the item.
              If your return is approved, we will initiate a refund to your credit card (or original method of payment).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Shipping</h2>
            <p>
              You will be responsible for paying for your own shipping costs for returning your item.
              Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Contact Us</h2>
            <p>
              If you have any questions on how to return your item to us, contact us at support@shopease.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
