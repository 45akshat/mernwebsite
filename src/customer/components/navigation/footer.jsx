import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Scroll to the top after navigation
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4 className="footer-heading">JOIN YAHOOM</h4>
          <p className="footer-text">Streetwear that speaks amazing!</p>
        </div>

        {/* Accordion structure for mobile view */}
        <div className="footer-column">
          <div
            className="flex flex-row justify-between w-[80vw]"
            onClick={() => toggleAccordion(0)}
          >
            <h4 className="footer-heading">PAGES</h4>
            <h4 className="footer-heading">+</h4>
          </div>
          <ul className={`footer-list ${activeIndex === 0 ? "active" : ""}`}>
            <li><span onClick={() => handleNavigation('/')} className="footer-link">Home</span></li>
            <li><span onClick={() => handleNavigation('/account')} className="footer-link">Account</span></li>
            <li><span onClick={() => handleNavigation('/products')} className="footer-link">Products</span></li>
            <li><span onClick={() => handleNavigation('/customer-care')} className="footer-link">Customer Care</span></li>
            <li><a href="https://yahoom.shiprocket.co/tracking/" target="_blank" className="footer-link">Track Order</a></li>

          </ul>
        </div>

        <div className="footer-column">
          <div
            className="flex flex-row justify-between w-[80vw]"
            onClick={() => toggleAccordion(1)}
          >
            <h4 className="footer-heading">COMPANY</h4>
            <h4 className="footer-heading">+</h4>
          </div>
          <ul className={`footer-list ${activeIndex === 1 ? "active" : ""}`}>
            <li><span onClick={() => handleNavigation('/about-us')} className="footer-link">About Us</span></li>
            <li><a href="https://www.instagram.com/yahoom.in/" target="_blank" className="footer-link">Instagram</a></li>

            <li><span onClick={() => handleNavigation('/terms')} className="footer-link">Terms & Conditions</span></li>
          </ul>
        </div>

        <div className="footer-column">
          <div
            className="flex flex-row justify-between w-[80vw]"
            onClick={() => toggleAccordion(2)}
          >
            <h4 className="footer-heading">POLICIES</h4>
            <h4 className="footer-heading">+</h4>
          </div>
          <ul className={`footer-list ${activeIndex === 2 ? "active" : ""}`}>
            <li><span onClick={() => handleNavigation('/shipping-policy')} className="footer-link">Shipping Policy</span></li>
            <li><span onClick={() => handleNavigation('/exchange-policy')} className="footer-link">Exchange Policy</span></li>
            <li><span onClick={() => handleNavigation('/return-refund')} className="footer-link">Return & Refund</span></li>
            <li><span onClick={() => handleNavigation('/privacy-policy')} className="footer-link">Privacy Policy</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Lal Melwani & Grandsons LLP</p>
      </div>
    </footer>
  );
};

export default Footer;
