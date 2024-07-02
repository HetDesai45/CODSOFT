import React from 'react';
import {Box , styled} from '@mui/material';
import headerimg from '../images/bg.jpg';

const Header = () => {
  const StyleHeader = styled(Box)(({theme})=>({
    display: "flex",
    justifyContent: "center",
    minHeight: 400,
    backgroundImage: `url(${headerimg}})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: theme.palette.secondary.main

  }))
  return (
    <>
      <StyleHeader/>
    </>
  )
}

export default Header;