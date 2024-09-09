import React from 'react'

const HomeSectionCard = () => {
  return (
    <div className='cursor-pointer flex flex-col bg-white shadow-lg overflow-hidden w-auto ml-0.5'>
      <div className='h-auto w-auto'>
        <img className='object-cover object-top w-full h-full' src="https://aycs.co.in/cdn/shop/files/offwhite_2.jpg?v=1722958285&width=600" alt="" srcset="" />
      </div>

      <div className='p-4'>
        <h3 className='mt-2 text-sm text-gray-500'>Yahoom</h3>
        <p className='text-sm font-medium text-gray-900' >AYCS OG LOGO T-Shirt</p>
      </div>
    </div>
  )
}

export default HomeSectionCard
