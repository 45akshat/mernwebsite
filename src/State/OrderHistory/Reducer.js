// Action Types
export const FETCH_USER_ORDERS_REQUEST = 'order/fetchUserOrdersRequest';
export const FETCH_USER_ORDERS_SUCCESS = 'order/fetchUserOrdersSuccess';
export const FETCH_USER_ORDERS_FAILURE = 'order/fetchUserOrdersFailure';
export const RESET_ORDERS = 'order/resetOrders';

// Action Creators
export const fetchUserOrdersRequest = () => ({
  type: FETCH_USER_ORDERS_REQUEST,
});

export const fetchUserOrdersSuccess = (orders) => ({
  type: FETCH_USER_ORDERS_SUCCESS,
  payload: orders,
});

export const fetchUserOrdersFailure = (error) => ({
  type: FETCH_USER_ORDERS_FAILURE,
  payload: error,
});

export const resetOrders = () => ({
  type: RESET_ORDERS,
});

// Fetch User Orders Function
export const fetchUserOrders = (userId) => {
  return async (dispatch) => {
    dispatch(fetchUserOrdersRequest());
    try {
      const response = await fetch(`http://localhost:5454/order/user/${userId}`);
      const data = await response.json();
      // console.log(data); // Optional: log the fetched data
      dispatch(fetchUserOrdersSuccess(data));
    } catch (error) {
      console.error('Failed to fetch user orders:', error);
      dispatch(fetchUserOrdersFailure(error.toString()));
    }
  };
};

// Initial State
const initialState = {
  loading: false,
  orders: [],
  error: null,
};

// Reducer
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case FETCH_USER_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RESET_ORDERS:
      return initialState;

    default:
      return state;
  }
};

export default orderReducer;
