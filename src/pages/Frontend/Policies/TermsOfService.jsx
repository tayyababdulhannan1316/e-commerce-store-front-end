import React from 'react';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <div className="text-center mb-8">
          <FileText className="mx-auto text-blue-600 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
        </div>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Introduction</h2>
            <p>
              Welcome to ShopEase. By accessing our website, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on ShopEase's website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Disclaimer</h2>
            <p>
              The materials on ShopEase's website are provided on an 'as is' basis. ShopEase makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Limitations</h2>
            <p>
              In no event shall ShopEase or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ShopEase's website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
