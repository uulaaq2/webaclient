import React from 'react'
import { Button } from '@mui/material'

const BButton = ({ children, buttonType, variant, color, ...rest }) => {
  if (buttonType === 'signIn') {
    variant = 'contained'
  }
  return (
    <Button variant={variant} color={color} {...rest} disableElevation style={{textTransform: 'none'}}>{children}</Button>
  );
};

export default BButton;