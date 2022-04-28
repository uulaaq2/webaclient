import React, { useRef } from 'react'
import { TextField, Chip, Grow } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const useStyles = makeStyles({
  root: {
    [`& fieldset`]: {
          borderRadius: 5,
    },      
  },  
});


const ShowError = ({ errorText }) => {
  return (
    <Grow  in={true} >
      <Chip 
        icon={<ErrorOutlineIcon />} 
        label={errorText} 
        size='small' 
        sx={{ marginTop: '0.2rem' }}     
      />
    </Grow>
  )
}

const BTextField = ({ children, error, errorText = '', ...rest}) => {
  const classes = useStyles()

  return (
    <div>
      <TextField error={errorText ? true : false } {...rest} className={classes.root} />
      { errorText ? <ShowError errorText={errorText} /> : '' }
    </div>
  );
};

export default BTextField;