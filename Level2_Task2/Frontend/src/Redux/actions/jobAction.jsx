import { JOB_LOAD_REQUEST } from "../constants/jobconstant"
import axios from 'axios';

export const jobLoadAction = (pageNumber, keyword='', cat='', location='')=>async(dispatch)=>{
  dispatch({type: JOB_LOAD_REQUEST});
  try {
    const {data} = await axios.get('/')
  } catch (error) {
    
  }
}