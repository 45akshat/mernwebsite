import axios from 'axios';
import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCT_BY_ID_SUCCESS, FETCH_PRODUCT_BY_ID_FAILURE } from './ActionType';
import { API_BASE_URL } from '../../config/apiConfig';

// Action to fetch all products
export const fetchProducts = (query = '') => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/products?${query}`);
    console.log(response)
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      payload: error.message,
    });
  }
};

// Action to fetch product by ID
export const fetchProductById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/products/${id}`);
    dispatch({
      type: FETCH_PRODUCT_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};
