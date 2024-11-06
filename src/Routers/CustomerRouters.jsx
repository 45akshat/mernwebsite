import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HomePage from '../customer/pages/HomePage/HomePage';
import Cart from '../customer/components/Cart/Cart';
import Example from '../customer/components/navigation/navigation';
import Footer from '../customer/components/navigation/footer';
import Product from '../customer/Product/Product';
import ProductDetails from '../customer/components/ProductDetails/ProductDetails';
import CheckoutPage from '../customer/components/Checkout/Checkout';
import OrderHistory from '../customer/components/OrderHistory/OrderHistory';
import LoginForm from '../customer/LoginForm/LoginForm';
import './styles.css'; // Import your CSS file
import CartItem from '../customer/components/Cart/CartItem';
import Account from '../customer/Account/Account';
import AboutUs from '../customer/pages/about-us';
import PrivacyPolicy from '../customer/pages/privacy-policy';
import ExchangePolicy from '../customer/pages/exchange-policy';
import RefundReturnPolicy from '../customer/pages/return-refund';
import ShippingPolicy from '../customer/pages/shipping-policy';
import TermsOfService from '../customer/pages/terms-of-service';
import CustomerCare from '../customer/pages/customer-care';

const CustomerRouters = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/';
  const [showCart, setShowCart] = useState(true);

  

  return (
    <div>
      <div>
        <Example page_is={location.pathname === '/' ? 'homepage' : 'other'} />
      </div>

      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="fade" // Use your CSS class names here
          timeout={{
            enter: 300,
            exit: 0 // Keep exit the same to allow for fading out without affecting visibility
          }}
        >
          <div>
            <Routes location={location}>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/cart' element={ <CartItem showCart={showCart} setShowCart={setShowCart} />} />
              <Route path='/products' element={<Product />} />
              <Route path='/product/:productId' element={<ProductDetails />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/order-history' element={<OrderHistory />} />
              <Route path='/account' element={<Account />} />
              <Route path='/about-us' element={<AboutUs />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/exchange-policy' element={<ExchangePolicy />} />
              <Route path='/return-refund' element={<RefundReturnPolicy />} />
              <Route path='/shipping-policy' element={<ShippingPolicy />} />
              <Route path='/customer-care' element={<CustomerCare />} />
              <Route path='/terms' element={<TermsOfService />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>

      {!hideHeaderFooter && (
        <div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default CustomerRouters;
