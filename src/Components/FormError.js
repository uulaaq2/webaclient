import React from 'react'
import { Box, Typography, Grow } from '@mui/material'

const FormError = ({errorText = '', ...rest}) => {
  return (
    <Grow 
      in={true} 
    >
      <Box 
        {...rest}        
        sx={{
          padding: '10px',
          borderRadius: '5px',
          color: '#fff',
          backgroundColor: '#ff7961',
          opacity: [0.9, 0.8, 0.3],
          '&:hover': {
            backgroundColor: 'error.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Typography variant='body1'>{errorText}</Typography>
      </Box>
    </Grow>
  );
};

export default FormError;