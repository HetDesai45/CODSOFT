import {
  CREATE_JOB_TYPE_FAIL,
  CREATE_JOB_TYPE_REQUEST,
  CREATE_JOB_TYPE_RESET,
  CREATE_JOB_TYPE_SUCCESS,
  DELETE_JOB_TYPE_FAIL,
  DELETE_JOB_TYPE_REQUEST,
  DELETE_JOB_TYPE_RESET,
  DELETE_JOB_TYPE_SUCCESS,
  JOB_TYPE_LOAD_FAIL,
  JOB_TYPE_LOAD_REQUEST,
  JOB_TYPE_LOAD_RESET,
  JOB_TYPE_LOAD_SUCCESS,
} from "../constants/jobTypeConstant";

const initialState = {
  loading: false,
  jobTypeAll: {
    jobTypeInfo: localStorage.getItem("jobTypeInfo")
      ? JSON.parse(localStorage.getItem("jobTypeInfo"))
      : null,
  },
};

export const loadJobTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOB_TYPE_LOAD_REQUEST:
      return { ...state, loading: true };
    case JOB_TYPE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        jobType: action.payload.jobt,
      };
    case JOB_TYPE_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case JOB_TYPE_LOAD_RESET:
      return {};
    default:
      return state;
  }
};

export const createJobTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_JOB_TYPE_REQUEST:
      return { loading: true };
    case CREATE_JOB_TYPE_SUCCESS:
      return {
        loading: false,
        jobType: action.payload,
      };
    case CREATE_JOB_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_JOB_TYPE_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteJobTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_JOB_TYPE_REQUEST:
      return { loading: true };
    case DELETE_JOB_TYPE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case DELETE_JOB_TYPE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_JOB_TYPE_RESET:
      return {};
    default:
      return state;
  }
};
