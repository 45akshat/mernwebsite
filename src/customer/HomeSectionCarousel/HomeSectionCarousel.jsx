


import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';



const items = [1, 1, 1, 1, 1, 1, 1, 1].map((item) => <HomeSectionCard />)

const responsive = {
    0: { items: 2 },
    568: { items: 3 },
    1024: { items: 5 },
};

function HomeSectionCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    const slidePrev = () => {
        // eslint-disable-next-line no-console
        console.log('Previous button clicked');
        setActiveIndex(activeIndex - 1);
    };
    const slideNext = () => {
        // eslint-disable-next-line no-console
        console.log('Next button clicked');
        setActiveIndex(activeIndex + 1);
    };

    return (
        <div className="relative">
            <div className="relative p-5">
                <AliceCarousel
                    items={items}
                    disableDotsControls
                    disableButtonsControls
                    responsive={responsive}
                    activeIndex={activeIndex}
                    onSlideChanged={(e) => {
                        setActiveIndex(e.item)
                    }}
                />
                {activeIndex != 0 && (
                    <button onClick={slidePrev} className="z-50 bg-transparent absolute top-1/2 left-[5vw] transform -translate-x-1/2 rotate-90 p-0 shadow-none" aria-label="previous">
                        <ArrowCircleLeftIcon sx={{ transform: "rotate(-90deg)", color: '#454f599c', fontSize: "28px" }} />
                    </button>
                )}
                {/* 2 for mobile, 5 for desktop */}
                {activeIndex != items.length - 2 && (

                    <button onClick={slideNext} className="z-50 bg-transparent absolute top-1/2 right-[5vw] transform translate-x-1/2 rotate-90 p-0 shadow-none" aria-label="next">
                        <ArrowCircleLeftIcon sx={{ transform: "rotate(90deg)", color: '#454f599c', fontSize: "28px" }} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default HomeSectionCarousel;
