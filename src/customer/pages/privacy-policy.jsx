import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black p-6"> {/* Center both vertically and horizontally */}
      <div className="max-w-2xl text-left"> {/* Center the div but left-align text */}
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm leading-relaxed text-gray-700 mb-4">
          At <span className="font-semibold">YAHOOM</span>, we prioritize your privacy. Lal Melwani & Grandsons LLP ("YAHOOM") is committed to protecting your personal information in accordance with Indian laws. We collect necessary details like your name, address, and payment info to process your orders. We never share this data with third parties, except for trusted partners who assist in fulfilling your orders.
        </p>
        
        <p className="text-sm leading-relaxed text-gray-700 mt-4">
          For any inquiries or changes to your data, contact us at <a href="mailto:info@yahoom.in" className="text-gray-900 underline">info@yahoom.in</a>. Your continued use of our website constitutes consent to our privacy practices.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
