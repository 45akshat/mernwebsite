import axios from "axios";
import { API_BASE_URL } from "../../confighttp://13.200.231.124:5454Config";
import {
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT
} from "./ActionType";

const token = localStorage.getItem('jwt');
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData, navigate) => async (dispatch) => {
    dispatch(loginRequest());

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        const user = response.data;
        
        
        if (user.jwt) {
            localStorage.setItem('jwt', user.jwt);
            localStorage.setItem('uid', user._id);
        }


        dispatch(loginSuccess(user.jwt));
    } catch (error) {
        
        dispatch(logout());  // Optional: You could also refresh the token
        dispatch(loginFailure(error.message));
    }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt, path) => async (dispatch) => {
    dispatch(getUserRequest());

    try {
        const response = await axios.get(`${API_BASE_URL}/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });
        const user = response.data;
        // console.log("user ", user);
        dispatch(getUserSuccess(user));
    } catch (error) {
            // JWT is expired or invalid
            dispatch(logout());  // Optional: You could also refresh the token here
            dispatch(getUserFailure("Session expired. Please log in again."));
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT, payload: null });
    localStorage.clear();
};
