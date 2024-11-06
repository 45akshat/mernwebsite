import React from "react";

const RefundReturnPolicy = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black p-6"> {/* Center both vertically and horizontally */}
      <div className="max-w-2xl text-left"> {/* Center the div but left-align text */}
        <h1 className="text-2xl font-bold mb-4">Refund & Return Policy</h1>
        <p className="text-sm leading-relaxed text-gray-700 mb-4">
          At <span className="font-semibold">YAHOOM</span>, we prioritize customer satisfaction by delivering high-quality products designed with care and precision. Please note that we do not offer any returns, refunds, or cancellations once an order is placed. This policy is in place to ensure the best possible shopping experience for all our customers by maintaining strict quality control measures.
        </p>
        
        <p className="text-sm leading-relaxed text-gray-700 mt-4">
          However, we understand that size or quality issues may occasionally arise. In such cases, we are happy to offer an exchange for the same product, provided that the item is in its original condition with tags intact. Exchanges can be requested within 7 days of receiving your product, and any exchange request due to sizing or quality concerns will be promptly addressed. To raise an exchange request, please visit our Raise an Exchange Request section or contact us at <a href="mailto:info@yahoom.in" className="text-gray-900 underline">info@yahoom.in</a> for further assistance.
        </p>

        <p className="text-sm leading-relaxed text-gray-700 mt-4">
          Please ensure that you carefully review your order before finalizing the purchase, as no refunds or cancellations will be entertained once the order is confirmed. We appreciate your understanding and commitment to following these policies, which allow us to deliver a seamless experience to all our valued customers.
        </p>
      </div>
    </div>
  );
};

export default RefundReturnPolicy;
