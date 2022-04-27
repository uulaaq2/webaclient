import React from 'react'
import { Button } from '@mui/material'
import config from '../../config'

const BButton = ({ children, buttonType, variant, color, ...rest }) => {
  if (buttonType === 'signIn') {
    variant = 'contained'
  }
  return (
    <Button variant={variant} color={color} {...rest} disableElevation style={{textTransform: 'none', borderRadius: config.theme.buttonRadius}}>{children}</Button>
  );
};

export default BButton;