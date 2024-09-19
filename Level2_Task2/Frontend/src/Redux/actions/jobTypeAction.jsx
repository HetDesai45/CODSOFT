import axios from "axios";
import {
  CREATE_JOBTYPE_FAIL,
  CREATE_JOBTYPE_REQUEST,
  CREATE_JOBTYPE_SUCCESS,
  DELETE_JOBTYPE_FAIL,
  DELETE_JOBTYPE_REQUEST,
  DELETE_JOBTYPE_SUCCESS,
  JOBTYPE_LOAD_FAIL,
  JOBTYPE_LOAD_REQUEST,
  JOBTYPE_LOAD_SUCCESS,
} from "../constants/jobTypeConstant";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const jobTypeLoadAction = () => async (dispatch) => {
  dispatch({ type: JOBTYPE_LOAD_REQUEST });
  try {
    const { data } = await axios.get(`http://localhost:8000/api/type/jobs`);

    localStorage.setItem("jobTypeInfo", JSON.stringify(data));
    dispatch({
      type: JOBTYPE_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOBTYPE_LOAD_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.error
          : error.message,
    });
  }
};

export const createJobTypeAction = (jobtype) => async (dispatch) => {
  dispatch({ type: CREATE_JOBTYPE_REQUEST });

  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/type/create",
      jobtype
    );
    console.log(data);
    dispatch({
      type: CREATE_JOBTYPE_SUCCESS,
      payload: data,
    });
    toast.success("Job type created successfully");
  } catch (error) {
    dispatch({
      type: CREATE_JOBTYPE_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

export const deleteSingleJobTypeAction = (job_id) => async (dispatch) => {
  dispatch({ type: DELETE_JOBTYPE_REQUEST });
  try {
    const { data } = await axios.delete(
      `http://localhost:8000/api/type/delete/${job_id}`
    );
    console.log(data);
    dispatch({
      type: DELETE_JOBTYPE_SUCCESS,
      payload: data,
    });
    toast.success("Job deleted successfully");
  } catch (error) {
    console.log("error",error)
    dispatch({
      type: DELETE_JOBTYPE_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};
