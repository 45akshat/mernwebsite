import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black p-6"> {/* Center both vertically and horizontally */}
      <div className="max-w-2xl text-left"> {/* Center the div but left-align text */}
        <h1 className="text-2xl font-bold mb-4">Shipping Policy</h1>
        <p className="text-sm leading-relaxed text-gray-700 mb-4">
          We aim to dispatch your orders within 2 business days. Standard delivery within India takes 5-7 business days, and express delivery takes 2-3 business days.
        </p>
        
        <p className="text-sm leading-relaxed text-gray-700 mt-4">
          Free shipping is available for all your orders.
        </p>

        <p className="text-sm leading-relaxed text-gray-700 mt-4">
          Once your order is shipped, a tracking number will be provided via whatsapp. Please check your whatsapp for updates.
        </p>

        <p className="text-sm leading-relaxed text-gray-700 mt-4">
          For any queries, contact us at: <a href="mailto:info@yahoom.in" className="text-gray-900 underline">info@yahoom.in</a>
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
