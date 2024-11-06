'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, AdjustmentsVerticalIcon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../State/Product/Action'

const sortOptions = [
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

// const filters = [
//   {
//     id: 'color',
//     name: 'Color',
//     options: [
//       { value: 'White', label: 'White', checked: false },
//       { value: 'Beige', label: 'Beige', checked: false },
//       { value: 'Blue', label: 'Blue', checked: false },
//       { value: 'Brown', label: 'Brown', checked: false },
//       { value: 'Green', label: 'Green', checked: false },
//       { value: 'Purple', label: 'Purple', checked: false },
//     ],
//   },
//   {
//     id: 'size',
//     name: 'Size',
//     options: [
//       { value: 'S', label: 'S', checked: false },
//       { value: 'M', label: 'M', checked: false },
//       { value: 'L', label: 'L', checked: false },
//       { value: 'XL', label: 'XL', checked: false },
//     ],
//   },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  
  const [filters, setFilters] = useState([]); // State for dynamic filters
  
  // Effect for fetching products based on query params
  useEffect(() => {
      const initialQuery = location.search ? location.search.replace('?', '') : '';
      
      // Function to capitalize the first letter of each query parameter value
      const capitalizeQueryParams = (query) => {
          const params = new URLSearchParams(query);
          
          for (const [key, value] of params.entries()) {
              const capitalizedValue = value
                  .split(',')
                  .map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
                  .join(',');
              params.set(key, capitalizedValue);
          }
          
          return params.toString();
      };
  
      // Capitalize query parameters in the initial query
      const formattedQuery = capitalizeQueryParams(initialQuery);
      
      // Dispatch the formatted query
      dispatch(fetchProducts(formattedQuery));
  }, [location.search, dispatch]);
  

  const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']; // Define the custom order for sizes

  useEffect(() => {
      const colors = new Set(); // Use a Set to ensure unique colors
      const sizeMap = new Map(); // Use a Map to store sizes and their total quantities
  
      products.forEach(product => {
          // Add unique colors to the Set
          if (product.color) colors.add(product.color);
  
          // Add unique sizes to the Map, accumulating the quantities
          if (product.sizes) {
              product.sizes.forEach(size => {
                  if (size.quantity > 0) {
                      // Accumulate quantities for the same size name
                      if (sizeMap.has(size.name)) {
                          sizeMap.set(size.name, sizeMap.get(size.name) + size.quantity);
                      } else {
                          sizeMap.set(size.name, size.quantity);
                      }
                  }
              });
          }
      });
  
      // Convert the Set to an array for colors
      const uniqueColors = Array.from(colors).map(color => ({ value: color, label: color, checked: false }));
  
      // Convert the Map to an array for sizes and sort them based on the custom order
      const uniqueSizes = sizeOrder
          .filter(size => sizeMap.has(size)) // Only include sizes with available quantities
          .map(size => ({ value: size, label: size, quantity: sizeMap.get(size), checked: false }));
  
      // Set dynamic filters
      const dynamicFilters = [
          {
              id: 'color',
              name: 'Color',
              options: uniqueColors,
          },
          {
              id: 'size',
              name: 'Size',
              options: uniqueSizes,
          },
      ];
  
      setFilters(dynamicFilters);
  
      // Initialize selected filters state
      const queryParams = new URLSearchParams(location.search);
      const filtersState = {};
  
      dynamicFilters.forEach(section => {
          const values = queryParams.getAll(section.id);
          if (values.length > 0) {
              filtersState[section.id] = values[0].split(',');
          }
      });
  
      setSelectedFilters(filtersState);
  }, [products]); // This effect runs only when products change
  
  // const fetchProducts = async (query = '') => {
  //   try {
  //     const response = await axios.get(`http://localhost:5454/products/products?${query}`);
  //     setProducts(response.data);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // };

  // Fetch product data from backend
  // useEffect(() => {

  
  //   const initialQuery = location.search ? location.search.replace('?', '') : '';
  //   fetchProducts(initialQuery);
  // }, [location.search]);
  
  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValue = searchParams.getAll(sectionId);

    if (filterValue.length > 0 && filterValue[0].split(',').includes(value)) {
        filterValue = filterValue[0].split(',').filter((item) => item !== value);
        if (filterValue.length === 0) {
            searchParams.delete(sectionId);
        }
    } else {
        filterValue.push(value);
    }

    if (filterValue.length > 0) {
        searchParams.set(sectionId, filterValue.join(','));
    }

    const query = searchParams.toString();
    setSelectedFilters({ ...selectedFilters, [sectionId]: filterValue });

    dispatch(fetchProducts(query));
    navigate({ search: `?${query}` });
}



  
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-xs font-bold text-gray-900">FILTER</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="text-xs font-medium text-gray-900 uppercase">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              onChange={() => handleFilter(option.value, section.id)}
                              defaultValue={option.value}
                              checked={selectedFilters[section.id]?.includes(option.value) || false} // Set checked state
                             
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500 text-xs" 
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-md font-bold tracking-tight text-gray-900 m-0 p-0">COLLECTION</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-[focus]:bg-gray-100', 
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>


              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <div className='flex flex-row justify-between'>
                  <div className='mr-3 text-xs text-gray-600 font-thin'>FILTER</div>
                  <AdjustmentsVerticalIcon aria-hidden="true" className="fill-gray-800 h-4 w-4" />

                </div>
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-2 gap-x-2 gap-y-8 lg:grid-cols-5 ">
              {/* Filters */}
              <form className="hidden lg:block">


                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900 uppercase">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                            onChange={()=> handleFilter(option.value, section.id)}
                              defaultValue={option.value}
                              defaultChecked={option.checked}

                                 checked={selectedFilters[section.id]?.includes(option.value) || false} // Set checked state
           
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-xs text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
