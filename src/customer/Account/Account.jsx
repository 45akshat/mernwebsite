import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from 'react-redux';
import './Checkout.css'; 
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { initiatePayment } from "../Payment/Payment_RZP";
import AddressForm from "../components/Checkout/AddressForm";
import { fetchUserOrders } from '../../State/OrderHistory/Reducer'; // Adjust the path as needed


const Account = () => {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true); // Consolidated loading variable
  const [currentAddress, setCurrentAddress] = useState(null);
  const authData = useSelector((state) => state.auth);
  
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

  const userId = localStorage.getItem("uid");
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    fetchAddresses(userId);
    console.log(jwt)
    dispatch(fetchUserOrders(userId, jwt)); // Dispatch action to fetch user orders
    // console.log("#main controls for fetching inital")
  }, [dispatch, userId, jwt, authData]);

  const fetchAddresses = async () => {
    try {

      const response = await axios.get(`/api/address/user/${userId}`, {
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    });
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewAddress = () => {
    setShowNewAddressForm(true);
    setCurrentAddress(null);
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
    try {
      if (currentAddress) {
        await axios.put(`/api/address/${currentAddress}`, { ...formData, user: userId });
        alert("Address updated successfully!");
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });

      } else {
        await axios.post(`/api/address`, { ...formData, user: userId });
        alert("Address created successfully!");
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });

      }
      setShowNewAddressForm(false);
      await fetchAddresses();
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
    setShowNewAddressForm(true);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`/api/address/${addressId}`);
      alert("Address deleted successfully!");
      await fetchAddresses();
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
    initiatePayment(0, fullName, email, mobile, userId, [], currentAddress);
  };

  const openTracking = (orderId) => {
    const shiprocketTrackingUrl = `https://yahoom.shiprocket.co/tracking/order/${orderId}`;
    window.open(shiprocketTrackingUrl, "_blank"); // Opens in a new tab
  };
  

  const { orders, error } = useSelector((state) => state.order_history);

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center mt-[8vh]">



      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 p-4 h-[fit-content]">

        
      <div className="bg-white p-6 rounded-lg shadow-lg h-[fit-content] md:col-span-2">
          <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
          <div className="space-y-6">

            {orders.length > 0 ? (
              orders
              .slice()
              .reverse().map((order) => (
                <div key={order._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
                    <h3 className="text-gray-600 text-sm font-medium">
                      Order ID: <span className="text-black font-extralight text-sm">{order._id}</span>
                    </h3>
                  </div>
                  <div className="space-y-4 mb-4">
                    {order.orderItems.map((item) => (
                      <div key={item._id} className="flex items-center space-x-5 mb-4">
                        <img src={item.imageSrc} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                        <div className="flex-1">
                          <h3 className="text-gray-800 text-lg font-semibold">{item.title}</h3>
                          <p className="text-gray-500 text-sm">Size: {item.size}</p>
                          <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                          <p className="text-gray-500 text-sm">₹{item.discountedPrice}.00</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center border-t pt-4">
                    <p className="text-lg font-semibold text-gray-800">Total: ₹{order.totalPrice}.00</p>
                    <button onClick={()=> openTracking(order._id)} className="px-5 py-2 bg-black text-white rounded-md hover:bg-green-700 transition">
                      Track
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No orders found.</p>
            )}
          </div>
        </div>


        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg h-[100%]">
          <h2 className="text-lg font-semibold mb-6">Shipping Address</h2>
          {addresses.length > 0 ? addresses.map((address) => (
            <div key={address._id} className="border p-4 rounded-lg relative mt-2">
              <div className="absolute top-2 left-2 ">
                <input
                  type="radio"
                  checked={address._id === currentAddress}
                  onChange={() => {
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
                  }}
                />
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

          {!showNewAddressForm && (
            <button
              onClick={handleAddNewAddress}
              className="text-blue-600 mt-4 underline hover:text-indigo-800"
            >
              + Add new address
            </button>
          )}

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



      </div>
    </div>
  );
};

export default Account;
