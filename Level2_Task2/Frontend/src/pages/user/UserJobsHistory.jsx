import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userProfileAction } from '../../Redux/actions/userAction';

const UserJobsHistory = () => {

  const {user} = useSelector((state)=>state.userProfile);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(userProfileAction());
  },[]);
  return (
    <>
      <Box>
        <Typography variant='h4' sx={{color: "#fafafa"}}>Jobs History</Typography>
        <Box>
          {
            user && user.jobsHistory.map((history)=>(
              <h3>{history.title}</h3>
            ))
          }
        </Box>
      </Box>
    </>
  )
}

export default UserJobsHistory