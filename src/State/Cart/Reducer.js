// Action Types
export const CART_ADD_ITEM = 'cart/addItem';
const CART_REMOVE_ITEM = 'cart/removeItem';
const CART_ITEM_INCREASE_QUANTITY = 'cart/increaseItemQuantity';
const CART_ITEM_DECREASE_QUANTITY = 'cart/decreaseItemQuantity';
export const CART_CLEAR = 'cart/clear'; // New action type


// Action Creators
export function addCartItem(productData) {
  return { type: CART_ADD_ITEM, payload: productData };
}

export function removeCartItem(key) {
  return { type: CART_REMOVE_ITEM, payload: { key } };
}

export function decreaseCartItemQuantity(key) {
  return {
    type: CART_ITEM_DECREASE_QUANTITY,
    payload: { key },
  };
}

export function increaseCartItemQuantity(key) {
  return {
    type: CART_ITEM_INCREASE_QUANTITY,
    payload: { key },
  };
}


// New action creator to clear the cart
export function clearCart() {
  return { type: CART_CLEAR };
}

// Reducer
const initialState = JSON.parse(localStorage.getItem('cart')) || [];

export default function cartReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case CART_ADD_ITEM:
      const existingItem = state.find(
        (cartItem) => cartItem.key === action.payload.key // Use key for existing item check
      );
      
      if (existingItem) {
        // If the item already exists, increase its quantity
        newState = state.map((cartItem) => {
          if (cartItem.key === existingItem.key) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
      } else {
        // If it doesn't exist, add the new item to the cart
        newState = [...state, { ...action.payload, quantity: 1 }];
      }
      break;

    case CART_REMOVE_ITEM:
      newState = state.filter(
        (cartItem) => cartItem.key !== action.payload.key // Filter by key
      );
      break;

    case CART_ITEM_INCREASE_QUANTITY:
      newState = state.map((cartItem) => {
        if (cartItem.key === action.payload.key) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      break;

    case CART_ITEM_DECREASE_QUANTITY:
      newState = state
        .map((cartItem) => {
          if (cartItem.key === action.payload.key) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity > 0); // Remove item if quantity is 0
      break;

    
    case CART_CLEAR: // Clear the cart
      newState = [];
      localStorage.removeItem('cart')
      break;

    default:
      return state;
  }

  // Save new state to localStorage
  localStorage.setItem('cart', JSON.stringify(newState));
  return newState;
}
