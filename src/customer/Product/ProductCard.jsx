import React from 'react';
import "./ProductCard.css";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/product/${product._id}`)} className='productCard w-[100%] transition-all cursor-pointer'>
      <div className='h-[14em] relative image-container'>
        <img className='h-[100%] w-full object-cover object-left-top image-default' src={"https://sfycdn.speedsize.com/d31641c5-60cb-4a0b-8662-59094f81bb6e/"+product.imageUrls[0]+"&v=1728044930&width=2720"} alt="Default" />
        <img className='h-[100%] w-full object-cover object-left-top image-hover' src={"https://sfycdn.speedsize.com/d31641c5-60cb-4a0b-8662-59094f81bb6e/"+product.imageUrls[1]+"&v=1728044930&width=2720"} alt="On Hover" />
      </div>

      <div className='textPart bg-white p-3'>
        <div>
          <h3 className='text-gray-500 text-xs lg:text-xs' style={{ fontSize: '8px' }}>YAHOOM</h3>
          <p className='font-medium text-gray-900 text-xs lg:text-sm'>{product.title}</p>
          <div className='flex items-center space-x-2'>
            <p className='font-semibold text-xs lg:text-sm'>₹{product.discountedPrice}</p>
            <p className='line-through opacity-50 text-xs lg:text-sm'>₹{product.price}</p>
            <p className='text-green-600 text-xs lg:text-sm'>{product.discountPercent}% off</p>
          </div>
        </div>

{/* Sizes Section */}
<div className="mt-2 grid grid-cols-3 gap-2">
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

export default ProductCard;
