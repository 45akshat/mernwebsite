import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Button } from '@mui/material';

const HomeSectionCarousel = () => {
    const responsive = {
        0: { 
            items: 2.2
        },
        720: { 
            items: 3
        },
        1024: {
            items: 4, 
        },
    };

    const items = [1,1,1,1].map((item)=> <HomeSectionCard/>)

  return (
    <div className='relative w-100%'>
        <div className='relative p-4'>
          <AliceCarousel
            animationType="fadeout"
            animationDuration={800}
            items={items}
            disableButtonsControls
            responsive={responsive}
            />

        </div>
<button class="z-50 bg-transparent absolute top-1/2 right-[5vw] transform translate-x-1/2 rotate-90 p-0 shadow-none" aria-label="next">
    <ArrowCircleLeftIcon sx={{transform:"rotate(90deg)", color:'#454f599c', fontSize: "28px"}} />
</button>


<button class="z-50 bg-transparent absolute top-1/2 left-[5vw] transform -translate-x-1/2 rotate-90 p-0 shadow-none" aria-label="previous">
    <ArrowCircleLeftIcon sx={{transform:"rotate(-90deg)", color:'#454f599c', fontSize: "28px"}} />
</button>

    </div>
  )
}

export default HomeSectionCarousel
