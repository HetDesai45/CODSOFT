import { JOB_LOAD_FAIL, JOB_LOAD_REQUEST, JOB_LOAD_SUCCESS } from "../constants/jobconstant"
import axios from 'axios';

export const jobLoadAction = (pageNumber, keyword='', cat='', location='')=>async(dispatch)=>{
  event.preventDefault();
  dispatch({type: JOB_LOAD_REQUEST});
  try {
    const {data} = await axios.get(`http://localhost:8000/api/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`);
    dispatch({
      type: JOB_LOAD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: JOB_LOAD_FAIL,
      payload: error.response && error.response.data ? error.response.data.error : error.message,

    });
  }
}