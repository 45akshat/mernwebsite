'use client'

import { useEffect, useState } from 'react'
import { CSSTransition } from "react-transition-group";
import { Radio, RadioGroup } from '@headlessui/react'

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import { Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import CartItem from '../Cart/CartItem';
import HomeSectionCarousel from '../../HomeSectionCarousel/HomeSectionCarousel';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../ProductDetails/ProductDetails.css'
import { fetchProductById } from '../../../State/Product/Action'; // Adjust the import path accordingly
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../../State/Cart/Reducer';
import { trackAddToCart, trackProductView } from '../../../pixel';


const ProductDetails = () => {
  // const [product, setProduct] = useState(null); // State for product data
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  // const [error, setError] = useState(null); // Error state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("inch");

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };


  const { productId } = useParams(); // Get productId from URL parameters
  const dispatch = useDispatch();

  const product = useSelector((state) => state.products.product); // Single product object
  const productsInCart = useSelector((state) => state.cart); // Get products in the cart
  const error = useSelector((state) => state.products.error); // To handle error state

  // Fetch product details when productId is provided
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
      setLoading(false);
    }
  }, [dispatch, productId]);


  useEffect(() => {
    if (product) {
      setSelectedColor(product.color);

      const availableSize = product.sizes.find(size => size.quantity > 0);
      setSelectedSize(availableSize || null);

      setLoading(false);
    } else if (error) {
      setLoading(false); // End loading if there's an error
    }
  }, [product, error]);

  useEffect(() => {
    if (product && product.title) {
      trackProductView(productId, product.title);
    }
  }, [product]);


  const handleAddToCart = (event) => {
    event.preventDefault();
    setShowCart(true); // Show the cart when the button is clicked


    // Ensure a size is selected
    if (!selectedSize) {
      alert('Please select a valid size.');
      return;
    }

    // Check if the size is available in stock
    const sizeInCart = productsInCart.find(
      (cartItem) => cartItem.productId === product._id && cartItem.size.name === selectedSize.name
    );

    // Calculate the total quantity of the selected size in the cart
    const quantityInCart = sizeInCart ? sizeInCart.quantity : 0;

    // Ensure that the total quantity (cart + new) does not exceed the available stock
    if (quantityInCart >= selectedSize.quantity) {
      alert(`You can't add more of this size. Only ${selectedSize.quantity} left in stock.`);
      return;
    }

    // Proceed to add to cart if the size is available
    const cartProductDetails = {
      key: `${product._id}-${selectedSize.name}`, // Combine productId and size name for a unique key
      productId: product._id, // Assuming product has an id
      title: product.title,
      color: selectedColor,
      size: selectedSize,
      price: product.discountedPrice, // Use the discounted price
      quantity: 1 // Assuming you want to add one item at a time
    };

    trackAddToCart(product._id, product.title, product.discountedPrice);


    dispatch(addCartItem(cartProductDetails));
  };


  // Handling loading and error states
  if (!product && productId) {
    return <div>Loading product details...</div>; // Display loading for product details
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if occurred
  }

  const isMobile = window.innerWidth <= 768; // You can adjust the width for mobile detection

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1.09 : 1.10, // If mobile, show 1 slide, else 1.09 slides
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: function (i) {
      return (<img

        src={product.imageUrls[i]}
        alt={`Thumbnail ${i + 1}`}
      />
      );
    },

    adaptiveHeight: true
  };

  const style = {
    height: isMobile ? "100%" : "auto", // Apply 90% height for mobile, otherwise 60%
    width: isMobile ? "99%" : "99%", // Apply 90% width for mobile, otherwise auto or any default value
    marginLeft: isMobile ? "" : "0%"
  };



  const inchImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/muser-a9192.appspot.com/o/Untitled%20design%20(7).png?alt=media&token=06b2756d-20c5-4a00-8e7c-95005b82e108";
  const cmImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/muser-a9192.appspot.com/o/Untitled%20design.png?alt=media&token=35e881d0-5345-4642-9f0c-3209b0c1e82b";




  return (
    <div className="bg-white mt-[13vh]">
      <CSSTransition
        in={true}
        timeout={600}
        unmountOnExit
      >
        <CartItem showCart={showCart} setShowCart={setShowCart} />
      </CSSTransition>

      <div className="pt-0">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li className="text-xs">
              <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.title}
              </a>
            </li>
          </ol>
        </nav>

        <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 lg:p-6 px-4 lg:px-16  pt-6'>
          {/* Image gallery */}
          <div style={{}}>
            <Slider {...settings}>
              {product.imageUrls.map((url, index) => (
                <div key={index}>
                  <img
                    src={url}
                    alt={`Slide ${index + 1}`}
                    style={style}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24 lg:pt-8 lg:pr-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className='text-xs lg:text-xs font-thin text-gray-600'>YAHOOM</h1>
              <h1 className="text-2xl lg:text-2xl font-semibold text-gray-900">{product.title}</h1>
              <p className="text-sm mt-2 text-gray-800" style={{ whiteSpace: "pre-line" }}>{product.description}</p>
              
            </div>

            {/* Price and Discount */}
            <div className='flex space-x-3 items-center text-lg lg:text-xl text-gray-900 mt-4'>
              <p className='opacity-50 line-through text-2xl '>₹{product.price}</p>
              <p className="text-2xl tracking-tight text-gray-900">₹{product.discountedPrice}</p>
              <span className="inline-flex items-center rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-red-600">
                Save {product.discountPercent}%
              </span>
            </div>
            <p className='mt-2 text-gray-600 font-light text-xs'>Tax Included</p>

            <form className="mt-4">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <div className="mt-2">
                  <span className="inline-block px-4 py-2 rounded-md bg-gray-200 text-gray-900 text-xs">{selectedColor}</span>
                </div>
              </div>

              {/* Sizes */}
              {/* Sizes */}
              <div className="mt-8">


              <div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Size</h3>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            togglePopup();
          }}
          className="text-sm underline font-medium text-indigo-600 hover:text-indigo-500"
        >
          Size guide
        </a>
      </div>


        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={togglePopup}
          >
            <div
              className={`bg-black rounded-t-lg p-4 max-w-md w-full h-1/2 md:h-auto md:max-h-[60%] overflow-y-auto transform transition-transform duration-300 ${
                isPopupOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              }`}
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="flex justify-end">
                <button
                  onClick={togglePopup}
                  className="text-white bg-gray-800 rounded-full p-1 px-4 hover:bg-gray-600"
                >
                  X
                </button>
              </div>



              {/* Tabs */}
              <div className="flex justify-center mt-4 space-x-4">

                
                <button
                type="button" 
                  onClick={() => setSelectedTab("inch")}
                  className={`text-white font-thin py-1 px-3 rounded  text-xs ${
                    selectedTab === "inch" ? "bg-indigo-600" : "bg-gray-700"
                  }`}
                >
                  inch
                </button>
                <button
                type="button" 
                  onClick={() => setSelectedTab("cm")}
                  className={`text-white font-thin py-1 px-3 rounded  text-xs ${
                    selectedTab === "cm" ? "bg-indigo-600" : "bg-gray-700"
                  }`}
                >
                  cm
                </button>
              </div>


              

              {/* Image */}
              <div className="flex justify-center mt-4">
                <img
                  src={selectedTab === "inch" ? inchImageUrl : cmImageUrl}
                  alt="Size Chart"
                  className="max-w-full h-auto"
                />
              </div>

              <span class="inline-flex items-center rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-slate-200 ring-1 ring-inset ring-yellow-600/20">Note : For the perfect oversized fit, please note that if you typically wear a size S, we recommend choosing L or XL based on your height and body type. Embrace the fit that feels right for you!</span>

            </div>
          </div>
        )}
      
    </div>

    <fieldset aria-label="Choose a size" className="mt-2">
  <RadioGroup
    value={selectedSize}
    onChange={setSelectedSize}
    className="grid grid-cols-5 gap-2 sm:grid-cols-5 lg:grid-cols-8 xl:grid-cols-8"
  >
    {product.sizes.map((size) => (
      <Radio
        key={size._id}
        value={size}
        disabled={size.quantity === 0} // Disable out-of-stock sizes
        className={`group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase w-full
          ${size.quantity > 0 ? 'cursor-pointer' : 'bg-gray-50 text-gray-300 cursor-not-allowed'}
          ${selectedSize && selectedSize.name === size.name ? 'bg-black text-white' : 'bg-white text-gray-900'}`}
      >
        <span>{size.name}</span>

        {/* Out of Stock Indicator */}
        {size.quantity === 0 && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
          >
            <svg
              stroke="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
            >
              <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
            </svg>
          </span>
        )}
      </Radio>
    ))}
  </RadioGroup>
</fieldset>

              </div>

              {/* Add to Cart button */}
              <div className="mt-10">
                <button
                  type="submit"
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center rounded-md bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800"
                >
                  Add to Cart
                </button>
              </div>
            </form>

            <div className='mt-8'>
              <Accordion
                sx={{
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)',
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.10)',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className='font-thin text-xs'
                >
                  Description
                </AccordionSummary>
                <AccordionDetails>
                <div className="text-xs" style={{ whiteSpace: "pre-line" }}>
  {product.description}
</div>


                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)',
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.10)',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                  className='font-thin text-xs'
                >
                  Washcare
                </AccordionSummary>
                <AccordionDetails >
                  <div className='text-xs' style={{ whiteSpace: "pre-line" }}>
{`• Wachine wash inside out in cold water
• ⁠Use mild detergent.
• ⁠Dry and Iron inside out.
• ⁠Do not Iron on the print.
• ⁠Do not Bleach or use Fabric Softeners`}
                    </div>
                </AccordionDetails>
              </Accordion>

              <Accordion
                sx={{
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)',
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.10)',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                  className='font-thin text-xs'
                >
                  Exchange Policy
                </AccordionSummary>
                <AccordionDetails >
                  <div className='text-xs'>
                     You can exchange the product within 7 days, email us at info@yahoom.in. For full guide visit our exchange policy.
                    </div>
                </AccordionDetails>
              </Accordion>
            </div>



            {/* Description and details */}

          </div>
        </section>


      </div>

      {/* Similar products */}
      <section className='pt-10 px-[1vw] lg:px-[5vw]'>
        <h1 className='text-center text-2xl font-bold'>You may also like</h1>
        <div>
          <HomeSectionCarousel />
        </div>
      </section>



    </div>
  );
};

export default ProductDetails;
