import React from 'react'
import { Button } from '@mui/material'
import config from '../../config'

const BButton = ({ children, buttonType, variant, color, ...rest }) => {
  if (variant === '') {
    variant = 'contained'
  }

  return (
    <Button variant={variant} color={color} {...rest} disableElevation >{children}</Button>
  );
};

export default BButton