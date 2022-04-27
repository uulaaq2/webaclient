import React from 'react'
import { Container } from '@mui/material'

const BContainer = ({ children, ...rest}) => {
  return (
    <Container {...rest}>{children}</Container>
  );
};

export default BContainer;