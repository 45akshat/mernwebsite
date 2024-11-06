import React from 'react';

import './App.css'; // Import the CSS file for styling
import Example from './customer/components/navigation/navigation';
import HomePage from './customer/pages/HomePage/HomePage';
import Product from './customer/Product/Product';
import ProductDetails from './customer/components/ProductDetails/ProductDetails';
import Footer from './customer/components/navigation/footer';
import Cart from './customer/components/Cart/Cart';
import Checkout from './customer/components/Checkout/Checkout';
import OrderHistory from './customer/components/OrderHistory/OrderHistory';
import { Route, Routes } from 'react-router-dom';
import CustomerRouters from './Routers/CustomerRouters';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<CustomerRouters/>}></Route>
      </Routes>

      <div>

        {/* <HomePage/> */}
        {/* <Product/> */}
        {/* <ProductDetails/> */}
        {/* <Cart/> */}
        {/* <Checkout/> */}
        {/* <OrderHistory/> */}
        {/* <Footer/> */}
      </div>
      {/* Other components and content */}
    </div>
  );
}

export default App;
