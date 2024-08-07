import axios from "axios";
import { toast } from "react-toastify";
import {
  ALL_USER_LOAD_FAIL,
  ALL_USER_LOAD_REQUEST,
  ALL_USER_LOAD_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  USER_APPLY_JOB_FAIL,
  USER_APPLY_JOB_REQUEST,
  USER_APPLY_JOB_SUCCESS,
  USER_LOADING_FAIL,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstant";

axios.defaults.withCredentials = true;

export const userSignInAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await axios.post(
      `https://codsoft-pxih.onrender.com/api/signin`,
      user,
      {
        withCredentials: true,
      }
    );
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

export const userSignUpAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  try {
    const { data } = await axios.post(
      `https://codsoft-pxih.onrender.com/api/signup`,
      user,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
    toast.success("Signup Successfully!");
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
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
    const { data } = await axios.get(
      `https://codsoft-pxih.onrender.com/api/logout`
    );
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
  dispatch({ type: USER_LOADING_REQUEST });
  try {
    const { data } = await axios.get(
      `https://codsoft-pxih.onrender.com/api/me`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({
      type: USER_LOADING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOADING_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.error
          : error.message,
    });
  }
};

export const userApplyJobAction = (job) => async (dispatch) => {
  dispatch({ type: USER_APPLY_JOB_REQUEST });
  try {
    const { data } = await axios.post(
      "https://codsoft-pxih.onrender.com/api/user/jobhistory",
      job
    );

    dispatch({
      type: USER_APPLY_JOB_SUCCESS,
      payload: data,
    });
    toast.success("Apply Successfully for this Job!");
  } catch (error) {
    dispatch({
      type: USER_APPLY_JOB_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

export const allUserAction = () => async (dispatch) => {
  dispatch({ type: ALL_USER_LOAD_REQUEST });
  try {
    const { data } = await axios.get(
      "https://codsoft-pxih.onrender.com/api/allusers",
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ALL_USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USER_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const deleteUserAction = (user_id) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    const { data } = await axios.delete(
      `https://codsoft-pxih.onrender.com/api/user/delete/${user_id}`
    );
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
    toast.success("User deleted successfully");
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};
