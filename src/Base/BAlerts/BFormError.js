import React from 'react'
import { Alert } from '@mui/material'

const BFormError = ({ message }) => {
  return (
    <Alert severity="error" sx={{fontSize: '0.9rem', padding: '0 0.5rem', display: 'flex', alignItems: 'center'}}>
      { message }
    </Alert>
  );
};

export default BFormError;