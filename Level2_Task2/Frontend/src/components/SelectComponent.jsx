import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'
import {useSelector} from 'react-redux';

const SelectComponent = ({handleChangeCategory, cat}) => {
  const {jobType} = useSelector((state) => state.jobTypeAll);
  return (
    <Box sx={{minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="select-label">Category</InputLabel>
        <Select 
          labelId='select-label'
          id='simple-select'
          value={cat}
          label='Category'
          onChange={handleChangeCategory}
        >
          <MenuItem value="">All</MenuItem>
          {
            jobType && jobType.map(jt=>(
              <MenuItem key={jt._id} value={jt._id}>{jt.jobTypeName}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectComponent;
