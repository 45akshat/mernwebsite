import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import './HomeSectionCarousel.css'; // Import a CSS file for custom styles

const HomeSectionCarousel = () => {
    const products = useSelector((state) => state.products.products);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2, // Show only one slide on mobile
                    slidesToScroll: 2,
                },
            },
        ],
    };

    // Map over products to create HomeSectionCard components
    const items = products.map((product) => <HomeSectionCard key={product.id} product={product} />);

    return (
        <div className='relative w-full'>
            <div className='relative p-2'>
                <Slider {...settings}>
                    {items}
                </Slider>
            </div>
        </div>
    );
}

// Arrow components
const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
<div className="arrow next" onClick={onClick}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="24"
        height="24"
    >
        <polyline points="9 18 15 12 9 6" />
    </svg>
</div>

    );
}

const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
<div className="arrow prev" onClick={onClick}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="24"
        height="24"
    >
        <polyline points="15 18 9 12 15 6" />
    </svg>
</div>

    );
}

export default HomeSectionCarousel;
