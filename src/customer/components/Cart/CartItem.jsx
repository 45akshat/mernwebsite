'use client'

import { useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseCartItemQuantity, increaseCartItemQuantity } from '../../../State/Cart/Reducer'
import { fetchProducts } from '../../../State/Product/Action'

function CartItem({ setShowCart, showCart }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCheckout = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    setShowCart(false)

    navigate('/checkout')
  }

  const handleCloseCart = () => {
    setShowCart(false)
  }

  const products = useSelector((state) => state.cart)
  const allProducts = useSelector((state) => state.products.products) // All fetched products

  useEffect(() => {
    dispatch(fetchProducts(''))
  }, [dispatch])

  // Function to handle increasing the cart item quantity with stock check
  const handleIncreaseQuantity = (product) => {
    let matchingProduct = allProducts.find(allProduct => allProduct._id === product.productId)
    if (matchingProduct) {
      let matchingSize = matchingProduct.sizes.find(size => size.name === product.size.name)

      if (matchingSize && product.quantity < matchingSize.quantity) {
        dispatch(increaseCartItemQuantity(product.key))
      } else {
        alert(`Only ${matchingSize.quantity} items available in stock.`)
      }
    }
  }

  // Function to update cart with available quantities
  let updated_cart = products.map((product) => {
    let matchingProduct = allProducts.find(allProduct => allProduct._id === product.productId)
    if (matchingProduct) {
      let matchingSize = matchingProduct.sizes.find(size => size.name === product.size.name)
      if (matchingSize) {
        // Adjust the quantity if it exceeds the available quantity
        let adjustedQuantity = Math.min(product.quantity, matchingSize.quantity)

        return {
          ...product,
          availableQuantity: matchingSize.quantity, // Add available quantity from allProducts
          quantity: adjustedQuantity, // Adjusted quantity to match available stock
          imageSrc: matchingProduct.imageUrls ? matchingProduct.imageUrls[0] : '', // Use the first image URL if available
          price: matchingProduct.price,
          discountedPrice: matchingProduct.discountedPrice,
          discountPercent: matchingProduct.discountPercent,
        }
      }
    }
    
    return product
  })

  // console.log(updated_cart)
  // console.log(allProducts)
  // Calculate total amount
  const totalAmount = updated_cart.reduce((total, product) => {
    return total + product.discountedPrice * product.quantity
  }, 0)

  return (
    <Dialog open={showCart} onClose={handleCloseCart} className="relative z-1000">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden z-[999999]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-sm font-bold text-gray-900">CART</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={handleCloseCart}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {updated_cart.map((product) => (
                          <li key={product.key} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={product.imageAlt}
                                src={"https://sfycdn.speedsize.com/d31641c5-60cb-4a0b-8662-59094f81bb6e/"+product.imageSrc+"&v=1728044930&width=2720"}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900 flex-col">
                                  <h3>
                                    <a href={product.href}>{product.title}</a>
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500">{product.color} - {product.size.name}</p>

                                  <div className='flex space-x-3 items-center text-lg lg:text-xl text-gray-900 '>
                                    <p className='opacity-50 line-through text-sm tracking-wide'>₹{product.price}</p>
                                    <p className="text-sm text-gray-900 tracking-wide">₹{product.discountedPrice}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm mt-2">
                                <div className="flex items-center">
                                  <button
                                    onClick={() => dispatch(decreaseCartItemQuantity(product.key))}
                                    className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-l-md border border-gray-300 hover:bg-gray-300 focus:outline-none"
                                  >
                                    −
                                  </button>
                                  <input
                                    type="text"
                                    value={product.quantity}
                                    readOnly
                                    className="w-12 text-center bg-white border-t border-b border-gray-300 py-2 text-gray-700 focus:outline-none"
                                  />
                                  <button
                                    onClick={() => handleIncreaseQuantity(product)}
                                    className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-r-md border border-gray-300 hover:bg-gray-300 focus:outline-none"
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="flex">

                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Amount</p>
                    <p>₹{totalAmount.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Tax Included & Free Shipping on all orders.</p>
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={handleCloseCart}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default CartItem
