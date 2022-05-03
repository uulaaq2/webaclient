import React, { useRef, useState } from 'react'
import { TextField, Chip, Grow } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles"
import InputAdornment from '@mui/material/InputAdornment'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress'
import DoneIcon from '@mui/icons-material/Done';

const useStyles = makeStyles({
  root: {
    /*[`& fieldset`]: {
          borderRadius: 5,
    },*/      
  },
})

const ShowError = ({ errorText }) => {
  return (
    <Chip 
      icon={<ErrorOutlineIcon />} 
      label={errorText} 
      size='small' 
      sx={{ marginTop: '0.2rem', fontSize: '0.8rem' }}     
    />
  )
}

const BTextField = ({ 
    children, 
    error, 
    errorText = '', 
    ...rest}) => {

      const classes = useStyles()
      
      return (
        <div>
          <TextField 
            error={errorText ? true : false } 
            //className={classes.root} 
            {...rest}             
          />
          { errorText ? <ShowError errorText={errorText} /> : '' }
        </div>
      )

}

export default BTextField;