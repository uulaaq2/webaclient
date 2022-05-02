import React from 'react'
import { Alert } from '@mui/material'

const BFormError = ({ message }) => {
  return (
    <Alert severity="error">
      { message }
    </Alert>
  );
};

export default BFormError;