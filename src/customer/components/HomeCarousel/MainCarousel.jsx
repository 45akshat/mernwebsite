import React from 'react';
import { mainCarouselData } from './MainCarouselData';

const MainCarousel = ({ itemIndex }) => {
  // Ensure itemIndex is 1-based
  const index = itemIndex - 1; // Convert to 0-based index
  const selectedItem = mainCarouselData[index]; // Get the specific item

  // Return null if no item is found
  if (!selectedItem) return null;

  const getImageSrc = (image, mobileImage) => {
    return window.innerWidth <= 768 ? mobileImage : image;
  };

  return (
    <img
      className="carousel-image"
      style={{
        pointerEvents: 'none'
      
      }}
      src={getImageSrc(selectedItem.image, selectedItem.mobileImage)}
      alt=""
    />
  );
};

export default MainCarousel;
