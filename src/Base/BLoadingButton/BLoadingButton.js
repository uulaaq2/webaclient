import React from 'react'
import { LoadingButton } from '@mui/lab'

const BLoadingButton = ({ children, buttonType = '', variant = '', color = 'primary', disableElevation = true, ...rest }) => {
  if (buttonType === '') {
    if (variant === '') {
      variant = 'contained'
    }
  }

  if (buttonType === 'signIn') {
    if (variant === '') {
      variant = 'contained'
    }
  }

  return (
    <LoadingButton variant={variant} color={color} disableElevation={disableElevation} {...rest} >{children}</LoadingButton>
  );
};

export default BLoadingButton