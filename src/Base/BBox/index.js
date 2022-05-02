import React from 'react'
import { Box } from '@mui/material'

const BBox = ({ children, ...rest }) => { 
  return (
      <Box { ...rest }>{children}</Box>
  );
};

export default BBox;