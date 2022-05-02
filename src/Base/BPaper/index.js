import React from 'react';
import { Paper } from '@mui/material'

const BPaper = ({ children, ...rest}) => {
  return (
    <Paper elevation={0} {...rest}>
      {children}    
    </Paper>
  );
};

export default BPaper;