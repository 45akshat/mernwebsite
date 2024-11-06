import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from 'react-redux';
import './Checkout.css'; 
import AddressForm from "./AddressForm";
import { fetchProducts } from "../../../State/Product/Action";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { initiatePayment } from "../../Payment/Payment_RZP";

const CheckoutPage = () => {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddr: '',
    city: '',
    state: '',
    pincode: '',
    mobile: '',
    email: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.cart);
  const allProducts = useSelector((state) => state.products.products); 

  useEffect(() => {
    dispatch(fetchProducts(''));
  }, [dispatch]);

  // Fetch addresses on initial component mount
  useEffect(() => {
    const userId = localStorage.getItem("uid");
    if (userId) {
      fetchAddresses(userId);
    }
  }, []);

  // Fetch addresses function
  const fetchAddresses = async (userId) => {
    try {
      const response = await axios.get(`/api/address/user/${userId}`);
      setAddresses(response.data);
       // Set the first address as the current address if available
       if (response.data.length > 0) {
        setCurrentAddress(response.data[0]._id); // Assuming _id is the identifier
      }

    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  let updated_cart = products.map((product) => {
    let matchingProduct = allProducts.find(allProduct => allProduct._id === product.productId)
    if (matchingProduct) {
      let matchingSize = matchingProduct.sizes.find(size => size.name === product.size.name)
      if (matchingSize) {
        let adjustedQuantity = Math.min(product.quantity, matchingSize.quantity)

        return {
          ...product,
          availableQuantity: matchingSize.quantity,
          quantity: adjustedQuantity,
          imageSrc: matchingProduct.imageUrls ? matchingProduct.imageUrls[0] : '',
          price: matchingProduct.price,
          discountedPrice: matchingProduct.discountedPrice,
          discountPercent: matchingProduct.discountPercent,
        }
      }
    }
    return product
  });

  const totalAmount = updated_cart.reduce((total, product) => {
    return total + product.discountedPrice * product.quantity;
  }, 0);

  const handleAddNewAddress = () => {
    setShowNewAddressForm(true);
    setCurrentAddress(null); // Resetting current address when adding a new one
    setFormData({
      firstName: '',
      lastName: '',
      streetAddr: '',
      city: '',
      state: '',
      pincode: '',
      mobile: '',
      email: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("uid");
    try {
      if (currentAddress) {
        await axios.put(`/api/address/${currentAddress}`, { ...formData, user: userId });
        alert("Address updated successfully!");
      } else {
        await axios.post(`/api/address`, { ...formData, user: userId });
        alert("Address created successfully!");
      }
      setShowNewAddressForm(false); // Hide the form after creation/updating
      fetchAddresses(userId); // Refresh addresses
    } catch (error) {
      console.error("Error creating/updating address:", error);
    }
  };

  const handleEditAddress = (address) => {
    setCurrentAddress(address._id);
    setFormData({
      firstName: address.firstName,
      lastName: address.lastName,
      streetAddr: address.streetAddr,
      city: address.city,
      pincode: address.pincode,
      state: address.state,
      mobile: address.mobile,
      email: address.email
    });
    setShowNewAddressForm(true); // Show the form for editing
  };

  const handleDeleteAddress = async (addressId) => {
    const userId = localStorage.getItem("uid");
    try {
      await axios.delete(`/api/address/${addressId}`);
      alert("Address deleted successfully!");
      fetchAddresses(userId); // Refresh addresses
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handlePlaceOrder = () => {
    if (!currentAddress) {
      alert("Please select a shipping address before placing the order.");
      return;
    }

    const { firstName, lastName, email, mobile } = formData;
    const fullName = `${firstName} ${lastName}`;

    initiatePayment(totalAmount, fullName, email, mobile, localStorage.getItem("uid"), updated_cart, currentAddress, navigate, dispatch);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center mt-[8vh]">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        {/* Left Section - Contact and Shipping Info */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-6">Shipping Address</h2>

          {/* Addresses List */}
          {addresses.length > 0 ? addresses.map((address) => (
            <div key={address._id} className="border p-4 rounded-lg relative mt-2">
              <div className="absolute top-2 left-2 ">
                <input type="radio" checked={address._id === currentAddress} onChange={() => {
                      setFormData({
                        firstName: address.firstName,
                        lastName: address.lastName,
                        streetAddr: address.streetAddr,
                        city: address.city,
                        pincode: address.pincode,
                        state: address.state,
                        mobile: address.mobile,
                        email: address.email
                      });

                  setCurrentAddress(address._id)}} />
              </div>
              <div className="ml-6">
                <h3 className="font-bold text-sm">{address.firstName} {address.lastName}</h3>
                <p className="text-sm">{address.streetAddr}</p>
                <p className="text-sm">{address.city}, {address.state}, {address.pincode}</p>
                <p className="text-sm">{address.mobile}</p>
                <div className="flex space-x-4 mt-2">
                  <button onClick={() => handleEditAddress(address)} className="text-blue-500 text-sm">Edit</button>
                  <button onClick={() => handleDeleteAddress(address._id)} className="text-blue-500 text-sm">Delete</button>
                </div>
              </div>
            </div>
          )) : (
            <p>No addresses available.</p>
          )}

          {/* Add New Address Button */}
          {!showNewAddressForm && (
            <button
              onClick={handleAddNewAddress}
              className="text-blue-600 mt-4 underline hover:text-indigo-800"
            >
              + Add new address
            </button>
          )}

          {/* Slide-down Transition for New Address Form */}
          <CSSTransition
            in={showNewAddressForm}
            timeout={300}
            classNames="slide-down"
            unmountOnExit
          >
            <AddressForm 
              formData={formData} 
              handleInputChange={handleInputChange} 
              handleCreateOrUpdate={handleCreateOrUpdate} 
            />
          </CSSTransition>
        </div>

        {/* Right Section - Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg h-[fit-content]">
          <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
          <div className="space-y-6">
            {updated_cart.map((product) => (
              <div key={product.key} className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <img
                    src={product.imageSrc}
                    alt={product.title}
                    className="h-16 w-16 object-cover object-center rounded-md border border-gray-200"
                  />
                  <div>
                    <h3 className="text-gray-700 font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-500">{product.color}, {product.size.name}</p>
                    <div className='flex space-x-3 items-center text-lg lg:text-xl text-gray-900 '>
                      <p className='opacity-50 line-through text-sm tracking-wide'>₹{product.price}</p>
                      <p className="text-sm text-gray-900 tracking-wide">₹{product.discountedPrice}</p>
                    </div>
                  </div>
                </div>
                <div className="text-gray-900 tracking-wide text-sm lg:text-sm">
                  x{product.quantity}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t pt-6">
              <p className="font-semibold text-lg">Total</p>
              <p className="font-semibold text-gray-900 tracking-wide">₹{totalAmount}</p>
            </div>

            <button 
              onClick={handlePlaceOrder} 
              className="w-full text-center py-2 bg-black text-white rounded-md hover:bg-gray-900"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
