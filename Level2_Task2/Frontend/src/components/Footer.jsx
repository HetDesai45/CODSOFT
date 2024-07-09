import { Box, useTheme } from '@mui/material'
import React from 'react'

const Footer = () => {
  const {palette} = useTheme();
  return (
    <>
      <Box sx={{
        height: '70px',
        bgcolor: palette.secondary.midNightBlue,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}> 
        <Box component='span' sx={{color: palette.primary.main}}>All rights reserved! 2024</Box>
      </Box>
    </>
  )
}

export default Footer