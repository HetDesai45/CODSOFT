import React from 'react';
import {Box , styled} from '@mui/material';
import headerimg from '../images/back.jpg';
import SearchInputEL from './SearchInputEL';

const Header = () => {
  const StyleHeader = styled(Box)(({theme})=>({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 500,
    backgroundImage: `url(${headerimg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: theme.palette.secondary.main

  }))
  return (
    <>
      <StyleHeader>
        <SearchInputEL />
      </StyleHeader>
    </>
  )
}

export default Header;