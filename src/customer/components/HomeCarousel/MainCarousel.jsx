import React from 'react';
import { mainCarouselData } from './MainCarouselData';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const MainCarousel = ({ itemIndex }) => {
  // Ensure itemIndex is 1-based
  const index = itemIndex - 1; // Convert to 0-based index
  const selectedItem = mainCarouselData[index]; // Get the specific item

  const getImageSrc = (image, mobileImage) => {
    if (window.innerWidth <= 768) {
      return mobileImage;
    }
    return "https://sfycdn.speedsize.com/d31641c5-60cb-4a0b-8662-59094f81bb6e/"+image+"&v=1728044930&width=2720";
  };

  // Create an array with the selected item
  const items = selectedItem ? [
    <img
      className='carousel-image'
      role='presentation'
      src={getImageSrc(selectedItem.image, selectedItem.mobileImage)}
      alt=""
    />
  ] : []; // Return empty array if no item found

  return (
    <AliceCarousel
      items={items}
      disableButtonsControls
      disableDotsControls
      mouseTracking={false}   // Disable mouse swipe
      touchTracking={false}   // Disable touch swipe
      infinite={false}        // Optional: disable infinite loop
    />
  );
};

export default MainCarousel;