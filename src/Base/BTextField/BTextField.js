import React from 'react'
import { TextField } from '@mui/material'

const BTextField = ({ children, ...rest}) => {
  return (
    <TextField {...rest} />
  );
};

export default BTextField;