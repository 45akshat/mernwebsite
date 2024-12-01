import React from "react";

const ExchangePolicy = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black p-6"> {/* Center both vertically and horizontally */}
      <div className="max-w-2xl text-left"> {/* Center the div but left-align text */}
        <h1 className="text-2xl font-bold mb-4">Exchange Policy</h1>
        <p className="text-sm leading-relaxed text-gray-700 mb-4">
          At <span className="font-semibold">YAHOOM</span>, we prioritize customer satisfaction and strive to ensure that you are happy with your purchase. If for any reason you are not completely satisfied with the size or quality of the product, we offer a hassle-free exchange policy, subject to the following terms:
        </p>
        
        <ul className="list-disc list-inside text-sm text-gray-700 leading-relaxed mt-4">
          <li>Exchanges are accepted within 7 days of receiving your product.</li>
          <li>The item must be in its original condition with tags and packaging intact.</li>
          <li>Sale items are not eligible for exchanges.</li>
          <li>Customers are responsible for return shipping fees, unless the product is found to be defective or damaged upon receipt.</li>
          <li>To initiate an exchange, please email us at <a href="mailto:info@yahoom.in" className="text-gray-900 underline">info@yahoom.in</a> with your order number and reason for the exchange.</li>
        </ul>

        <p className="text-sm leading-relaxed text-gray-700 mt-4">
          Important: We do not accept returns under any circumstances. Exchanges are allowed only for size or quality issues.
        </p>

        <p className="text-sm leading-relaxed text-gray-700 mt-4">
          For defective items, please provide photographic evidence and a detailed description of the issue in your email to ensure quick processing of your exchange request.
        </p>
      </div>
    </div>
  );
};

export default ExchangePolicy;
