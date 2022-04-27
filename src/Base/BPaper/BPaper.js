import React from 'react';
import { Paper } from '@mui/material'

const BPaper = ({ children, ...rest}) => {
  return (
    <Paper {...rest} elevation={0}>{children}</Paper>
  );
};

export default BPaper;