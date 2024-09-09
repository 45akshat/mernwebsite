import React from 'react';
import { mainCarouselData } from './MainCarouselData';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const MainCarousel = () => {
  const getImageSrc = (image, mobileImage) => {
    if (window.innerWidth <= 768) {
      return mobileImage;
    }
    return image;
  };

  const items = mainCarouselData.map((item) => (
    <img
      className='carousel-image'
      role='presentation'
      src={getImageSrc(item.image, item.mobileImage)}
      alt=""
    />
  ));

  return (
    <AliceCarousel
      animationType="fadeout"
      animationDuration={800}
      items={items}
      disableButtonsControls
      disableDotsControls
      autoPlay
      autoPlayInterval={1900}
      infinite
    />
  );
};

export default MainCarousel;
