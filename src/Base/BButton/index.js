import React from 'react'
import { Button } from '@mui/material'
import config from '../../config'

const BButton = ({ children, buttonType, variant, color, ...rest }) => {
  if (buttonType === '') {
    variant = 'contained'
  }

  if (buttonType === 'submit') {
    variant = 'contained'
  }  

  if (buttonType === 'text') {
    variant = 'text'
  }

  if (buttonType === 'dialogSuccess') {
    variant = 'contained'
    color = 'success'
  }


  return (
    <Button variant={variant} color={color} {...rest} disableElevation >{children}</Button>
  );
};

export default BButton