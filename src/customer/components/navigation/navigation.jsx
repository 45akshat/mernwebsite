'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import logo from '../../../assets/logo.png'; // Import the logo image
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../../../State/Auth/Action';
import { useLocation, useNavigate } from 'react-router-dom';
import CartItem from '../Cart/CartItem';

const allProducts = [
  { name: 'Tshirt 1', href: '' },
  { name: 'Tshirt 2', href: '#' },
  { name: 'Tshirt 3', href: '#' },
  { name: 'Tshirt 4', href: '#' },
];

export default function Example({ page_is }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);



  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let jwt = localStorage.getItem('jwt');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt, location.pathname));
    }
  }, [dispatch, jwt, location.pathname]); // Include location.pathname here

  useEffect(() => {
    if (jwt) {
      if (location.pathname === '/login' || location.pathname === '/register') {
        // console.log("#factor 1 ", jwt)
        navigate('/account');
      }
    }
  }, [jwt, location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('jwt');
    localStorage.removeItem('uid');
  };

  useEffect(() => {
    if (location.pathname === '/logout') {
      handleLogout();
    }
  }, [location.pathname]);

  useEffect(() => {
    // console.log("alarm", jwt);
    jwt = localStorage.getItem('jwt');

    if (jwt && authData.user?._id) {
      localStorage.setItem('uid', authData.user._id);
    }
    if (!jwt) {
      if (location.pathname === '/account' || location.pathname === '/checkout') {
        navigate('/login');
      }
    }
  }, [jwt, authData.user, location.pathname]); // Include location.pathname here

  const handleNavigate = (where) => {
    navigate(where);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const bgClass = page_is === 'homepage' ? 'bg-transparent' : 'bg-black';


  return (
    <header className={`header_main ${bgClass} ${hasScrolled ? 'shadow-lg shadow-slide-down' : ''} transition-shadow duration-300`}>
      {/* <p className={`delivery-banner flex h-10 items-center justify-center bg-black px-4 text-xs font-medium text-white sm:px-6 lg:px-8 ${hasScrolled ? 'banner-hide' : 'banner-show'} transition-all duration-500 ease-in-out`}>
        Get free delivery on orders over $100
      </p> */}
      <CartItem showCart={showCart} setShowCart={setShowCart} />

      <nav aria-label="Global" className="mx-0 flex max-w-[100vw] items-center justify-between p-3 px-6 lg:px-8">

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6 stroke-white flex flex-1" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12 lg:flex-1">

          {/* <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-xs font-normal leading-6 text-white uppercase">
              All products
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {allProducts.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-lg p-4 text-xs font-normal leading-6 text-white uppercase hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover> */}


          <div
            onClick={() => handleNavigate('/products')}  // Pass a function to call handleNavigate
            className="text-xs font-normal leading-6 text-white uppercase cursor-pointer"
          >
            All Products
          </div>
          <div
            onClick={() => handleNavigate('/account')}  // Pass a function to call handleNavigate
            className="text-xs font-normal leading-6 text-white uppercase cursor-pointer"
          >
            Account
          </div>
          <div
            onClick={() => handleNavigate('/customer-care')}  // Pass a function to call handleNavigate
            className="text-xs font-normal leading-6 text-white uppercase cursor-pointer"
          >
            Customer Care
          </div>
          
        </PopoverGroup>

        <div className="flex flex:1 lg:flex-1 justify-center">
          <div className="mx-auto -m-1.5 p-1.5 cursor-pointer" onClick={() => handleNavigate('/')}>
            <span className="sr-only">Yahoom</span>
            <img alt="Company Logo" src={logo} className="h-8 w-auto" />
          </div>
        </div>

        <div className="flex flex:1 lg:flex-1 justify-center lg:justify-end items-center ">
          <div className="cursor-pointer" onClick={() => setShowCart(true)} >
            <span className="sr-only">Yahoom</span>
            <svg width={26}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V10.9673M10.4 21H13.6C15.8402 21 16.9603 21 17.816 20.564C18.5686 20.1805 19.1805 19.5686 19.564 18.816C20 17.9603 20 16.8402 20 14.6V12.2C20 11.0799 20 10.5198 19.782 10.092C19.5903 9.71569 19.2843 9.40973 18.908 9.21799C18.4802 9 17.9201 9 16.8 9H7.2C6.0799 9 5.51984 9 5.09202 9.21799C4.71569 9.40973 4.40973 9.71569 4.21799 10.092C4 10.5198 4 11.0799 4 12.2V14.6C4 16.8402 4 17.9603 4.43597 18.816C4.81947 19.5686 5.43139 20.1805 6.18404 20.564C7.03968 21 8.15979 21 10.4 21Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </div>
        </div>

        {/* <div className="flex justify-end lg:hidden">
          <a href="#" className="mx-auto -m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
    <img alt="Company Logo" src="" className="h-8 w-auto" />
          </a>
        </div> */}




        {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <button onClick={() => setShowCart(true)} className="text-sm font-normal leading-6 text-white uppercase">
            Cart
          </button>
        </div> */}

      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div className="-m-1.5 p-1.5" onClick={() => handleNavigate('/')}>
              <span className="sr-only">Your Company</span>
              <img alt="" src={logo} className="h-8 w-auto" />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50">
                    All products
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180 transition-transform" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {allProducts.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-normal leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure> */}
                <div
                  onClick={() => {
                    handleNavigate('/')
                    setMobileMenuOpen(false)
                  }}  // Pass a function to call handleNavigate
                  className="text-sm font-normal leading-6 text-black uppercase cursor-pointer"
                >
                  Home
                </div>

                <div
                  onClick={() => {
                    handleNavigate('/products')
                    setMobileMenuOpen(false)
                  }}  // Pass a function to call handleNavigate
                  className="text-sm font-normal leading-6 text-black uppercase cursor-pointer"
                >
                  All Products
                </div>


                <div
                  onClick={() => {
                    handleNavigate('/customer-care')
                    setMobileMenuOpen(false)
                  }}  // Pass a function to call handleNavigate
                  className="text-sm font-normal leading-6 text-black uppercase cursor-pointer"
                >
                  Customer Care
                </div>
              </div>
              <div className="py-6">
                <div
                  onClick={() => {
                    handleNavigate('/login')
                    setMobileMenuOpen(false)
                  }}  // Pass a function to call handleNavigate
                  className="text-sm font-normal leading-6 text-black uppercase cursor-pointer"
                >
                  Account
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
