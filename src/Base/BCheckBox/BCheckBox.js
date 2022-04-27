import React from 'react'
import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import style from './style.css'

const BCheckBox = ({ label, color }) => {
  return (
    <FormControlLabel 
    control={<Checkbox color="primary" />}
    label={<Typography className={style.label}>{label}</Typography>}
/>
  );
};

export default BCheckBox;