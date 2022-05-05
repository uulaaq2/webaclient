import moduleStyle from './style.css'
import globalStyle from '../../app.css'

import React, { useState, useEffect, useRef } from 'react'
import BInputGroup from '../../Base/BInputGroup'
import BCheckbox from '../../Base/BCheckbox'
import logo from '../../images/logo.png'
import config from '../../config'
import { validateInputFields, clearErrors } from '../../functions/fValidateInputFields'
import BFormError from '../../Base/BAlerts/BFormError'
import fSignIn from '../../functions/user/fSignIn'
import { bSetCookie } from '../../functions/fCookie'
import fSetPageTitle from '../../functions/fSetPageTitle'
import useSetUserContext from '../../hooks/useSetUserContext'
import useAppNavigate from '../../hooks/useAppNavigate'
import useIsUserSignedIn from '../../hooks/useIsUserSignedIn'

import { Grid, Paper, Stack, Link, Checkbox } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const SignIn = ({ urlInfo }) => { 
  fSetPageTitle(urlInfo)  

  const appNavigate = useAppNavigate()
  const [userContextIsSet, setUserContextIsSet] = useSetUserContext()

  const emailRef = useRef()
  const passwordRef = useRef()  
  const rememberMeRef = useRef()

  const [inProgress, setInProgress] = useState(false)
  const [erroredInputs, setErroredInputs] = useState([])
  const [formError, setFormError] = useState('')    

  const [showDialog, setShowDialog] = useState(false)

  const [inputs] = useState({
    email: {      
      name: 'Email or User Name',
      label: 'Email or User name',
      type: 'text',
      errorText: '',
      ref: emailRef,
      required: true,
      validate: true
    },
    password: {
      name: 'Password',
      label: 'Password',
      type: 'password',
      errorText: '',
      ref: passwordRef,
      required: true,
      validate: true
    },
    inputErors: 0,
    setErroredInputs: setErroredInputs,
  })  

  useEffect(() => {
    inputs.email.ref.current.focus()
  }, [])

  useEffect(() => {    
    if (erroredInputs[0]) {
      erroredInputs[0].focus()
    }
  }, [erroredInputs])

  useEffect(() => {
    if (userContextIsSet) {
      appNavigate(config.urls.home.path)
    }
  }, [userContextIsSet])

  async function handleSubmit() {    
    setShowDialog(true)
    try {      
      const validateInputFieldsResult = validateInputFields(inputs)
      if (validateInputFieldsResult.status === 'error') { 
        throw new Error(validateInputFieldsResult.message) 
      }
      if (validateInputFieldsResult.status !== 'ok') return

      setInProgress(true)

      const email = emailRef.current.value
      const password = passwordRef.current.value
      let rememberMe = rememberMeRef.current.checked

      const signInResult = await fSignIn(email, password, true, rememberMe)   
      if (signInResult.status === 'error') {
        throw new Error(signInResult.message)
      }
      if (signInResult.status === 'accountIsExpired') {
        throw new Error('Your account is expired, please contact to your system administrator')
      }

      if (signInResult.hasOwnProperty('user')) {
        if (signInResult.user.Can_Be_Remembered === 'No') {                    
          rememberMe = false
        }
      }

      if (signInResult.status === 'shouldChangePassword') {
        
        // prepare token and other options for change password
        // last 3 digits for set cookie / remember me / show current password - 0: off / 1: on
        // third from last digit: set cookie
        // second from last digit: remember me depends on if the remember me checkbox is checked
        // last digit: show current password
        appNavigate(config.urls.user.changePassword.path + '/' + signInResult.token + '1' + (rememberMe ? '1' : '0') + '0')

        return
      }      
      if (signInResult.status !== 'ok') {
        throw new Error('Invalid login credentials')
      }

      bSetCookie('token', signInResult.token, rememberMe)
      setUserContextIsSet(signInResult.user)
      
      
      

      
/*      if (signInResult.user.Home_Page) {
        navigate(signInResult.user.Home_Page)
      } else  {
        navigate(config.urls.home.path)
      }
 */

    } catch (error) {      
      setFormError(error.message)
      setInProgress(false)
    }    
  }

  return (
    <Grid className={moduleStyle.mainContainer}>
      <Paper className={moduleStyle.formContainer}>
        <img src={logo} alt='' className={globalStyle.logoTopLeft} />
        <Stack spacing='1.2rem'>
          <BInputGroup label={inputs.email.label} type={inputs.email.type} errorText={inputs.email.errorText} inputRef={emailRef} fullWidth />
          <BInputGroup label={inputs.password.label} type={inputs.password.type} errorText={inputs.password.errorText} inputRef={passwordRef} fullWidth />
          <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
            <BCheckbox label='Remember me' color='primary' inputRef={rememberMeRef} />
            <Link style={{display: 'none'}}>Forgot Password?</Link>
          </Stack>              
        </Stack>          
        <Stack>
          <LoadingButton variant='contained' onClick={handleSubmit} loading={inProgress}>Sign in</LoadingButton>
        </Stack> 
        <Stack>
          { formError ? <BFormError message={formError} /> : '' }
        </Stack>
      </Paper>
    </Grid>
  )

};

export default SignIn;