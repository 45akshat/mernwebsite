import axios from "axios";
import { clearCart } from "../../State/Cart/Reducer";

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  
  // Function to initiate payment
export const initiatePayment = async (amount, name, email, contact, user, orderItems, shippingAddress, navigate, dispatch) => {
  const isScriptLoaded = await loadRazorpayScript();
  if (!isScriptLoaded) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  // Request the backend to create a Razorpay order
  // const orderResponse = await axios.post("/api/payment/createOrder", {
  //   amount: amount * 100, // amount in paise
  //   currency: "INR",
  //   receipt: `receipt#${Date.now()}` // Generate a unique receipt
  // });

  const orderResponse = await axios.post("/api/payment/createOrder", {orderItems});

  const { orderId } = orderResponse.data;
  // console.log(orderResponse);


  const handleClearCart = () => {
    // Dispatch the clearCart action
    dispatch(clearCart());
  };

  const options = {
    key: "rzp_live_pYcxgNYPOVVg6s", // Replace with your Razorpay key_id
    amount: amount * 100, // Amount in paise (e.g., 100 paise = INR 1)
    currency: "INR",
    name: "Yahoom",
    description: "Payment Transaction",
    order_id: orderId,
    handler: async function (response) {
      // On successful payment, send the response to backend to verify
      // console.log(response)
      const data = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        user, // Include user ObjectId
        orderItems, // Include order items array
        shippingAddress, // Include shipping address ObjectId
        paymentDetails: {
          paymentMethod: "Online", // Example, adjust as needed
          transactionId: response.razorpay_order_id, // Use Razorpay payment ID
          paymentId: response.razorpay_payment_id // Same as transaction ID
        },
        discount: 50, // Adjust or calculate as necessary
        totalPrice: amount * 100, // Total price without discounts in paise
        totalDiscountedPrice: (amount * 100) - 50 // Total price after discount (example)
      };

      try {
        // Send payment details to backend for verification
        const verifyResponse = await axios.post("/api/payment/verifyPayment", data);

        // Check the response status from the backend
        if (verifyResponse.data.status === "success") {
          alert("Payment Successful!");
          handleClearCart()

          navigate("/account");  // Redirect to /account on success
          // Optionally, handle order confirmation UI update here
        } else {
          alert("Payment Failed! Please try again.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        alert("An error occurred while verifying the payment. Please try again.");
      }
    },
    prefill: {
      name: name, // Prefill name from parameter
      email: email, // Prefill email from parameter
      contact: contact, // Prefill contact number from parameter
    },
    theme: {
      color: "#000",
    },
    
  };
  // console.log("####",amount, name, email, contact)
  // Open Razorpay Checkout modal
  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
