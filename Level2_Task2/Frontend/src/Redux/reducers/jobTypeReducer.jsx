import {
  CREATE_JOBTYPE_FAIL,
  CREATE_JOBTYPE_REQUEST,
  CREATE_JOBTYPE_RESET,
  CREATE_JOBTYPE_SUCCESS,
  DELETE_JOBTYPE_FAIL,
  DELETE_JOBTYPE_REQUEST,
  DELETE_JOBTYPE_RESET,
  DELETE_JOBTYPE_SUCCESS,
  JOBTYPE_LOAD_FAIL,
  JOBTYPE_LOAD_REQUEST,
  JOBTYPE_LOAD_RESET,
  JOBTYPE_LOAD_SUCCESS,
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
    case JOBTYPE_LOAD_REQUEST:
      return { ...state, loading: true };
    case JOBTYPE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        jobType: action.payload.jobt,
      };
    case JOBTYPE_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case JOBTYPE_LOAD_RESET:
      return {};
    default:
      return state;
  }
};

export const createJobTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_JOBTYPE_REQUEST:
      return { loading: true };
    case CREATE_JOBTYPE_SUCCESS:
      return {
        loading: false,
        jobType: action.payload,
      };
    case CREATE_JOBTYPE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_JOBTYPE_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteJobTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_JOBTYPE_REQUEST:
      return { loading: true };
    case DELETE_JOBTYPE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case DELETE_JOBTYPE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_JOBTYPE_RESET:
      return {};
    default:
      return state;
  }
};
