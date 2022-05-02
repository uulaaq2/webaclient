import React from 'react'
import { Typography } from '@mui/material'

const BTypography = ({ children, ...rest }) => {
  return (
    <Typography {...rest}>{children}</Typography>
  );
};

export default BTypography;