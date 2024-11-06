import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import productReducer from "./Product/Reducer";
import cartReducer from "./Cart/Reducer";
import orderReducer from "./OrderHistory/Reducer";
import { authReducer } from "./Auth/Reducer";

const rootReducers=combineReducers({
     auth: authReducer,
     products: productReducer,
     cart: cartReducer,
     order_history: orderReducer
})
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))