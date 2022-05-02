import moduleStyle from './style.css'
import globalStyle from '../../app.css'

import React, { useState, useEffect, useRef } from 'react'
import BGrid from '../../Base/BGrid'
import BLoadingButton from '../../Base/BLoadingButton'
import BLink from '../../Base/BLink'
import BCheckBox from '../../Base/BCheckBox'
import BStack from '../../Base/BStack'
import BPaper from '../../Base/BPaper'
import BTextField from '../../Base/BTextField'
import { styled } from '@mui/system'
import logo from '../../images/logo.png'
import config from '../../config'
import validateInputFields from '../../functions/validateInputFields'
import BFormError from '../../Base/BAlerts/BFormError'
import fSignIn from '../../functions/user/fSignIn'
import { useNavigate } from 'react-router-dom'
import { bSetCookie } from '../../functions/bCookie'

const SignIn = () => { 
  document.title = config.urls.signIn.name + ' | ' + config.app.name

  const emailRef = useRef()
  const passwordRef = useRef()  
  const rememberMeRef = useRef()

  const [inProgress, setInProgress] = useState(false)
  const [erroredInputs, setErroredInputs] = useState([])
  const [formError, setFormError] = useState('')
  
  const navigate = useNavigate()

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
      const rememberMe = rememberMeRef.current.checked

      const signInResult = await fSignIn(email, password, true, rememberMe)   
      if (signInResult.status === 'error') {
        throw new Error(signInResult.message)
      }
      if (signInResult.status === 'accountIsExpired') {
        throw new Error('Your account is expired, please contact to your system administrator')
      }
      if (signInResult.status === 'shouldChangePassword') {
        navigate(config.urls.changePassword.path + '/' + signInResult.token + '1')

        return
      }      
      if (signInResult.status !== 'ok') {
        throw new Error('Invalid login credentials')
      }

      bSetCookie('token', signInResult.token, rememberMe)
      
    } catch (error) {      
      setFormError(error.message)
      setInProgress(false)
    }    
  }

  return (
    <BGrid className={moduleStyle.mainContainer}>
      <BPaper className={moduleStyle.formContainer}>
        <img src={logo} alt='' className={globalStyle.logoTopLeft} />
        <BStack spacing='1.2rem'>
          <BTextField label={inputs.email.label} type={inputs.email.type} errorText={inputs.email.errorText} inputRef={emailRef} fullWidth />
          <BTextField label={inputs.password.label} type={inputs.password.type} errorText={inputs.password.errorText} inputRef={passwordRef} fullWidth />
          <BStack flexDirection='row' justifyContent='space-between' alignItems='center'>
            <BCheckBox label='Remember me' color='primary' inputRef={rememberMeRef} />
            <BLink>Forgot Password?</BLink>
          </BStack>              
        </BStack>          
        <BStack>
          <BLoadingButton buttonType='submit' onClick={handleSubmit} loading={inProgress}>Sign in</BLoadingButton>
        </BStack> 
        <BStack>
          { formError ? <BFormError message={formError} /> : '' }
        </BStack>
      </BPaper>
    </BGrid>
  )

};

export default SignIn;