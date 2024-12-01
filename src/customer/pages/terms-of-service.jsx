import React from "react";

const TermsOfService = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black p-6 pt-[13vh]"> {/* Center both vertically and horizontally */}
      <div className="max-w-2xl text-left"> {/* Center the div but left-align text */}
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>

        <h2 className="text-lg font-semibold mt-4">1. Product and Service Availability</h2>
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          YAHOOM reserves the right to modify, suspend, or discontinue any product or service offered on our website at any time without prior notice. While we strive to maintain accuracy in product descriptions and pricing, there may be rare occasions where typographical errors or discrepancies occur.
        </p>
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          <strong>Product Images:</strong> We do not guarantee that the images of products on the website will exactly match the delivered product, as minor variations in color or design may exist due to different display settings or manufacturer updates.
        </p>
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          <strong>Pricing Errors:</strong> In the event of a pricing error, we reserve the right to cancel or refuse orders placed at the incorrect price, even if the order has been confirmed.
        </p>

        <h2 className="text-lg font-semibold mt-4">2. User Responsibilities</h2>
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          By using our website, you agree to the following:
        </p>
        <ul className="list-disc list-inside text-sm leading-relaxed text-gray-700 mb-2">
          <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account information, including your username, password, and personal details. Any activity that occurs under your account is your responsibility.</li>
          <li><strong>Legal Use:</strong> You agree to use our website and services only for lawful purposes and in compliance with all applicable laws and regulations.</li>
          <li><strong>Prohibited Activities:</strong> You must not engage in fraud, misrepresentation, or upload malicious software or engage in hacking.</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">3. Intellectual Property</h2>
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          All content on the YAHOOM website, including but not limited to text, graphics, logos, images, videos, and other material, is the exclusive property of Lal Melwani & Grandsons LLP or its content suppliers.
        </p>

        <h2 className="text-lg font-semibold mt-4">4. Limitation of Liability</h2>
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          YAHOOM strives to provide an optimal and seamless experience. However, we cannot be held liable for damages, losses, or injury that arise from:
        </p>
        <ul className="list-disc list-inside text-sm leading-relaxed text-gray-700 mb-2">
          <li>Technical difficulties, interruptions, or delays in service.</li>
          <li>Misuse of our products or third-party services connected with our products.</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">5. Privacy and Data Protection</h2>
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          We are committed to protecting your privacy. By using our website, you agree to the collection, use, and sharing of your personal data in accordance with our Privacy Policy.
        </p>

        <h2 className="text-lg font-semibold mt-4">6. Governing Law and Dispute Resolution</h2>
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          These Terms of Service are governed by and construed in accordance with the laws of [Your Jurisdiction]. In case of any disputes, you agree to first attempt to resolve the matter amicably by contacting YAHOOM customer service.
        </p>

        <h2 className="text-lg font-semibold mt-4">7. Changes to Terms</h2>
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          YAHOOM reserves the right to update or modify these Terms of Service at any time. When changes are made, we will post the updated version on this page.
        </p>

        <h2 className="text-lg font-semibold mt-4">Contact Information</h2>
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          For any questions regarding these Terms of Service, please contact us at:
        </p>
        <p className="text-sm leading-relaxed text-gray-700">
          Email: <a href="mailto:info@yahoom.in" className="text-gray-900 underline">info@yahoom.in</a>
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
