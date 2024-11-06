import { 
    FETCH_PRODUCTS_SUCCESS, 
    FETCH_PRODUCTS_FAILURE, 
    FETCH_PRODUCT_BY_ID_SUCCESS, 
    FETCH_PRODUCT_BY_ID_FAILURE 
  } from './ActionType';
  
  const initialState = {
    products: [],
    product: null,
    error: null,
    loading: false, // Added loading state
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.payload,
          loading: false, // Set loading to false when data is successfully fetched
        };
      case FETCH_PRODUCTS_FAILURE:
        return {
          ...state,
          error: action.payload,
          loading: false, // Set loading to false when there's an error
        };
      case FETCH_PRODUCT_BY_ID_SUCCESS:
        return {
          ...state,
          product: action.payload,
          loading: false, // Set loading to false when product is fetched
        };
      case FETCH_PRODUCT_BY_ID_FAILURE:
        return {
          ...state,
          error: action.payload,
          loading: false, // Set loading to false when there's an error
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
  