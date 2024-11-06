import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
      
      navigate(`/product/${product._id}`)
      
      }} className='HomeSectionCard w-[98%] transition-all cursor-pointer'>
      <div className='relative'>
        <img className='h-[100%] w-full object-cover object-left-top' src={product.imageUrls[0]} alt="" />
      </div>

      <div className='textPart bg-white p-3'>
        <div>
          <p className='font-medium text-gray-900 text-xs lg:text-sm'>{product.title}</p>
          <div className='flex items-center space-x-2'>
            <p className='font-semibold text-xs lg:text-sm'>₹{product.discountedPrice}</p>
            <p className='line-through opacity-50 text-xs lg:text-sm'>₹{product.price}</p>
            <p className='text-green-600 text-xs lg:text-sm'>{product.discountPercent}% off</p>
          </div>
        </div>

        {/* Sizes Section */}
{/* Sizes Section */}
<div className="mt-2 grid grid-cols-4 lg:grid-cols-6 gap-2">
  {product.sizes.map((size) => (
    <div key={size._id} className="relative">
      {size.quantity > 0 ? (
        <button className="border border-gray-300 px-2 py-1 text-xs font-medium uppercase hover:bg-black hover:text-white rounded-md transition w-full">
          {size.name}
        </button>
      ) : (
        <button className="border border-gray-300 px-2 py-1 text-xs font-medium uppercase bg-gray-200 text-gray-500 cursor-not-allowed rounded-md transition w-full" disabled>
          {size.name}
          {/* Out of Stock Overlay */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
          >
            <svg
              stroke="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full stroke-1 text-gray-400"
            >
              <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
            </svg>
          </span>
        </button>
      )}
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default HomeSectionCard;
