import React from 'react'
import { Stack } from '@mui/material'

const BStack = ({ children, ...rest }) => {
  return (
    <Stack {...rest}>{children}</Stack>
  );
};

export default BStack;