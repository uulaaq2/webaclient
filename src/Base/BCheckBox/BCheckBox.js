import React from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'


const BCheckBox = ({ label }) => {
  return (
    <FormControlLabel control={<Checkbox />} label={label} />
  );
};

export default BCheckBox;