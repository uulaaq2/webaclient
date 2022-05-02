import React, { useRef } from 'react'
import { TextField, Chip, Grow } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles"
import InputAdornment from '@mui/material/InputAdornment'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress'
import DoneIcon from '@mui/icons-material/Done';

const useStyles = makeStyles({
  root: {
    [`& fieldset`]: {
          borderRadius: 5,
    },      
  },  
})

const ShowError = ({ errorText }) => {
  return (
    <Chip 
      icon={<ErrorOutlineIcon />} 
      label={errorText} 
      size='small' 
      sx={{ marginTop: '0.2rem' }}     
    />
  )
}

const BTextField = ({ children, error, errorText = '', loading = false, success = false, ...rest}) => {
  const classes = useStyles()
  let inputProps = {}

  if (loading) {
    inputProps = {
      endAdornment: (
          <InputAdornment position="start">
            <CircularProgress size={20}/>
          </InputAdornment>
      )
    }
  }

  if (success) {
    inputProps = {
      endAdornment: (
          <InputAdornment position="start">
            <DoneIcon />
          </InputAdornment>
      )
    }
  }

  return (
    <div>
      <TextField 
        error={errorText ? true : false } 
        inputProps={inputProps}
        {...rest} 
        className={classes.root} 
      />
      { errorText ? <ShowError errorText={errorText} /> : '' }
    </div>
  );
};

export default BTextField;