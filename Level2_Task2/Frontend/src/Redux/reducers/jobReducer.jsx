
export const loadJobReducer = {state={jobs:[]},action}=>{
  switch(action.type){
    case JOB_LOAD_REQUEST:
      return{loading: true}
    case JOB_LOAD_REQUEST:
      return{
        loading: true,
        jobs: action.payload
      }

    default:
      return state;
  }
}