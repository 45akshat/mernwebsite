import React from "react";

const CustomerCare = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black p-6"> {/* Center both vertically and horizontally */}
      <div className="max-w-2xl text-left"> {/* Center the div but left-align text */}
        <h1 className="text-2xl font-bold mb-4">Customer Care</h1>
        
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          At YAHOOM, we are dedicated to providing you with the best possible service. Your satisfaction is our top priority. If you have any questions, concerns, or feedback, our Customer Care team is here to assist you.
        </p>

        <h2 className="text-lg font-semibold mt-4">Contact Us</h2>
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          You can reach out to us via email:
        </p>
        <ul className="list-disc list-inside text-sm leading-relaxed text-gray-700 mb-2">
          <li><strong>Email:</strong> <a href="mailto:info@yahoom.in" className="text-gray-900 underline">info@yahoom.in</a></li>
          <li><strong>Company Address:</strong> NO. 10 NARAYAN RESIDENCY PLOT NO 34 35 SR NO 313/1/2/34, NEAR ANJANA LAWNS PATHARDI PHATA,
          NASHIK.</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">Feedback</h2>
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          We value your feedback! If you have any suggestions on how we can improve our services, please feel free to reach out via email.
        </p>

        <p className="text-sm leading-relaxed text-gray-700">
          Thank you for choosing YAHOOM. We look forward to serving you!
        </p>
      </div>
    </div>
  );
};

export default CustomerCare;
