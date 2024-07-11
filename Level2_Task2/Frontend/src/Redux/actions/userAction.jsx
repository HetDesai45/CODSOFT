import axios from "axios";
import { toast } from "react-toastify";
import {
  USER_LOAD_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
} from "../constants/userConstant";

export const userSignInAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await axios.post(`http://localhost:8000/api/signin`, user,{
      withCredentials: true,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    toast.success("Login Successfully!");
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.error
          : error.message,
    });
    toast.error(error.response.data.error);
  }
};

export const userLogoutAction = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    const { data } = await axios.get(`http://localhost:8000/api/logout`);
    localStorage.removeItem("userInfo");

    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data,
    });
    toast.success("Logout Successfully!");
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.error
          : error.message,
    });
    toast.error(error.response.data.error);
  }
};

export const userProfileAction = () => async (dispatch) => {
  dispatch({ type: USER_LOAD_REQUEST });
  try {
    const { data } = await axios.get(`http://localhost:8000/api/me`);

    dispatch({
      type: USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOAD_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.error
          : error.message,
    });
  }
};
