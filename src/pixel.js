// src/utils/pixel.js
export const trackPageView = () => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  };
  
  export const trackAddToCart = (productID, productName, price) => {
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_ids: [productID],
        content_name: productName,
        content_type: 'product',
        value: price,
        currency: 'INR',
      });
    }
  };
  
  export const trackPurchase = (orderID, value) => {
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        content_ids: [orderID],
        value: value,
        currency: 'INR',
      });
    }
  };
  
  export const trackProductView = (productID, productName) => {
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_ids: [productID],
        content_name: productName,
        content_type: 'product',
      });
    }
  };
  