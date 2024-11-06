import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../../State/OrderHistory/Reducer'; // Adjust the path as needed

const OrderHistory = () => {
  const dispatch = useDispatch();

  // Select orders, loading state, and error from the Redux store
  const { orders, loading, error } = useSelector((state) => state.order_history); // Change to access the correct part of the state

  useEffect(() => {
    let userId = "abc"; 
    userId = localStorage.getItem("uid")
    
    dispatch(fetchUserOrders(userId)); // Dispatch action to fetch user orders
  }, [dispatch]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error fetching orders: {error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center py-10 mt-[6vh]">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-semibold mb-10 text-center text-gray-800">Order History</h2>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                {/* Order ID & Status */}
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
                  <h3 className="text-gray-600 text-sm font-medium">
                    Order ID: <span className="text-black font-extralight text-sm">{order._id}</span>
                  </h3>
                </div>

                {/* Product Info */}
                <div className="space-y-4  mb-4">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="flex items-center space-x-5 mb-4">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-20 h-20 object-cover object-center rounded-md border border-gray-200"
                      />
                      <div className="flex-1">
                        <h3 className="text-gray-800 text-lg font-semibold">{item.title}</h3>
                        <p className="text-gray-500 text-sm">Size: {item.size}</p>
                        <p className="text-gray-500 text-sm">{`Quantity: ${item.quantity}`}</p>
                        <p className="text-gray-500 text-sm">{`₹${item.discountedPrice}.00`}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total and Button */}
                <div className="flex justify-between items-center border-t pt-4">
                  <p className="text-lg font-semibold text-gray-800">Total: {`₹${order.totalPrice}.00`}</p>
                  <button className="px-5 py-2 bg-black text-white rounded-md hover:bg-green-700 transition duration-200">
                    Track 
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
