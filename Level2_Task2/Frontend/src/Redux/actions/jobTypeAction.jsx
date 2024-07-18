import axios from "axios";
import {
  CREATE_JOB_TYPE_FAIL,
  CREATE_JOB_TYPE_REQUEST,
  CREATE_JOB_TYPE_SUCCESS,
  DELETE_JOB_TYPE_FAIL,
  DELETE_JOB_TYPE_REQUEST,
  DELETE_JOB_TYPE_SUCCESS,
  JOB_TYPE_LOAD_FAIL,
  JOB_TYPE_LOAD_REQUEST,
  JOB_TYPE_LOAD_SUCCESS,
} from "../constants/jobTypeConstant";
import { toast } from "react-toastify";

export const jobTypeLoadAction = () => async (dispatch) => {
  dispatch({ type: JOB_TYPE_LOAD_REQUEST });
  try {
    const { data } = await axios.get(
      `https://codsoft-pxih.onrender.com/api/type/jobs`
    );

    localStorage.setItem("jobTypeInfo", JSON.stringify(data));
    dispatch({
      type: JOB_TYPE_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_TYPE_LOAD_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.error
          : error.message,
    });
  }
};

export const createJobTypeAction = (jobtype) => async (dispatch) => {
  dispatch({ type: CREATE_JOB_TYPE_REQUEST });

  try {
    const { data } = await axios.post(
      "https://codsoft-pxih.onrender.com/api/type/create",
      jobtype
    );
    dispatch({
      type: CREATE_JOB_TYPE_SUCCESS,
      payload: data,
    });
    toast.success("Job type created successfully");
  } catch (error) {
    dispatch({
      type: CREATE_JOB_TYPE_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

export const deleteSingleJobTypeAction = (job_id) => async (dispatch) => {
  dispatch({ type: DELETE_JOB_TYPE_REQUEST });
  try {
    const { data } = await axios.delete(
      `https://codsoft-pxih.onrender.com/api/type/delete/${job_id}`
    );
    dispatch({
      type: DELETE_JOB_TYPE_SUCCESS,
      payload: data,
    });
    toast.success("Job deleted successfully");
  } catch (error) {
    dispatch({
      type: DELETE_JOB_TYPE_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};
