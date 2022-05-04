import React from 'react'
import { LoadingButton } from '@mui/lab'

const BLoadingButton = ({ children, buttonType = '', variant = '', color = 'primary', disableElevation = true, ...rest }) => {
  if (buttonType === '') {
    variant = 'contained'
  }

  if (buttonType === 'submit') {
    variant = 'contained'
  }  

  if (buttonType === 'text') {
    variant = 'text'
  }

  return (
    <LoadingButton variant={variant} color={color} disableElevation={disableElevation} {...rest} >{children}</LoadingButton>
  );
};

export default BLoadingButton