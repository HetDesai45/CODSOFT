import axios from "axios";
import { toast } from "react-toastify";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
} from "../constants/userConstant";

export const userSignInAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await axios.post(`http://localhost:8000/api/signin`, user);
    localStorage.setItem('userInfo', JSON.stringify(data));
    
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
