import { JOB_LOAD_FAIL, JOB_LOAD_REQUEST, JOB_LOAD_RESET, JOB_LOAD_SINGLE_FAIL, JOB_LOAD_SINGLE_REQUEST, JOB_LOAD_SINGLE_RESET, JOB_LOAD_SINGLE_SUCCESS, JOB_LOAD_SUCCESS } from "../constants/jobconstant";

const initialState = {
  loading: false,
  success: false,
  job: [],
  setUniqueLocation: [],
  pages: 0,
  count: 0
};

export const loadJobReducer = (state=initialState,action)=>{
  switch(action.type){
    case JOB_LOAD_REQUEST:
      return{...state,loading: true}
    case JOB_LOAD_SUCCESS:
      return{
        ...state,
        loading: false,
        success: action.payload.success,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
        setUniqueLocation: action.payload.setUniqueLocation,
        job: action.payload.jobs
      }
    case JOB_LOAD_FAIL:
      return{
        ...state,
        loading: false,
        error: action.payload
      }
    case JOB_LOAD_RESET:
      return{}

    default:
      return state;
  }
}

export const loadJobSingleReducer = (state = { job: {} }, action) => {
  switch (action.type) {
      case JOB_LOAD_SINGLE_REQUEST:
          return { loading: true }
      case JOB_LOAD_SINGLE_SUCCESS:
          return {

              loading: false,
              success: action.payload.success,
              singleJob: action.payload.Job,

          }
      case JOB_LOAD_SINGLE_FAIL:
          return { loading: false, error: action.payload }
      case JOB_LOAD_SINGLE_RESET:
          return {}
      default:
          return state;
  }

}