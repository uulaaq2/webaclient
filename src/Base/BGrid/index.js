import React from 'react'
import { Grid } from '@mui/material'

const BGrid = ({ children, ...rest}) => {
  return (
    <Grid {...rest}>{children}</Grid>
  );
};

export default BGrid