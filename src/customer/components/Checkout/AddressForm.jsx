import React from "react";
import { CSSTransition } from "react-transition-group";

const AddressForm = ({ formData, handleInputChange, handleCreateOrUpdate }) => {
  return (
    <CSSTransition
      in={true} // Example transition control, replace with your actual condition
      timeout={300}
      classNames="slide-down"
      unmountOnExit
    >
      <form className="mt-8" onSubmit={handleCreateOrUpdate}>
        <h2 className="text-lg font-semibold mb-6">Contact Information</h2>
        <div className="mb-4">
          <label className="block text-gray-600">Email address</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <h2 className="text-lg font-semibold mt-8 mb-6">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">First name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Last name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mb-4 mt-4">
          <label className="block text-gray-600">Mobile Number</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4 mt-4">
          <label className="block text-gray-600">Address</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Address"
            name="streetAddr"
            value={formData.streetAddr}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">City</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Country</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
              <option>India</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-600">State / Province</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="State / Province"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Postal code</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Postal code"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Save Address Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800"
          >
            Save Address
          </button>
        </div>
      </form>
    </CSSTransition>
  );
};

export default AddressForm;
