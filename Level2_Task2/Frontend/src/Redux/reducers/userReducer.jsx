import {
  USER_LOADING_FAIL,
  USER_LOADING_REQUEST,
  USER_LOADING_RESET,
  USER_LOADING_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_RESET,
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_RESET,
  USER_SIGNIN_SUCCESS,
} from "../constants/userConstant";

const initialState = {
  loading: false,
  signIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const initialstate1 = {
  loading: false,
  success: false,
  user: null,
};

export const userReducerSignIn = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
        userInfo: null,
        isAuthenticated: false,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        isAuthenticated: true,
      };
    case USER_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        userInfo: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case USER_SIGNIN_RESET:
      return {};
    default:
      return state;
  }
};

export const userReducerLogout = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return { loading: true };
    case USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_LOGOUT_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT_RESET:
      return {};
    default:
      return state;
  }
};

export const userReducerProfile = (state = initialstate1, action) => {
  switch (action.type) {
    case USER_LOADING_REQUEST:
      return { ...state, loading: true, user: null };
    case USER_LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case USER_LOADING_FAIL:
      return {...state, loading: false, user: null, error: action.payload };
    case USER_LOADING_RESET:
      return {};
    default:
      return state;
  }
};