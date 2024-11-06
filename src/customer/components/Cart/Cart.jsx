import React from 'react'
import CartItem from './CartItem'

const Cart = ({ setShowCart, showCart }) => {
  return (
    <div className='mt-[13vh]'>
        <CartItem showCart={showCart} setShowCart={setShowCart} />
    </div>
  )
}

export default Cart
