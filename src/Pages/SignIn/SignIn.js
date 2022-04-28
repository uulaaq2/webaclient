import React, { useState, useEffect, useRef } from 'react'
import BGrid from '../../Base/BGrid/BGrid'
import BButton from '../../Base/BButton/BButton'
import BLink from '../../Base/BLink/BLink'
import BCheckBox from '../../Base/BCheckBox/BCheckBox'
import BStack from '../../Base/BStack/BStack'
import BPaper from '../../Base/BPaper/BPaper'
import BTextField from '../../Base/BTextField/BTextField'
import { styled } from '@mui/system'
import style from './style.css'
import logo from '../../images/logo.png'
import config from '../../config'
import validateInputFields from '../../functions/validateInputFields'
import FormError from '../../Components/FormError'

const Item = styled(BPaper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(3),
  borderRadius: config.theme.boxRadius,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '410px'
}))

const SignIn = () => { 
  document.title = config.urls.signIn.name + ' | ' + config.app.name

  const emailRef = useRef()
  const passwordRef = useRef()  
  const rememberMeRef = useRef()

  const [inProgress, setInProgress] = useState(false)
  const [erroredInputs, setErroredInputs] = useState([])
  const [formError, setFormError] = useState('')

  const [inputs] = useState({
    email: {      
      name: 'Email or User Name',
      label: 'Email or User name',
      errorText: '',
      ref: emailRef,
      required: true,
      validate: true
    },
    password: {
      name: 'Password',
      label: 'Password',
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
    console.log('aaa ', inputs)
    try {      
      const validateInputFieldsResult = validateInputFields(inputs)
      console.log(validateInputFieldsResult)
      if (validateInputFieldsResult.status === 'error') { 
        throw new Error(validateInputFieldsResult.message) 
      }
      if (validateInputFieldsResult.status !== 'ok') return

      setInProgress(true)


    } catch (error) {      
      setFormError(error.message)
      setInProgress(false)
    }    
  }

  
  return (
    <BGrid className={style.mainContainer}>
      <Item>
        <img src={logo} alt='' className={style.logo} />
        <BStack spacing='1.2rem'>
          <BTextField label={inputs.email.label} type={inputs.email.type} errorText={inputs.email.errorText} inputRef={emailRef} fullWidth />
          <BTextField label={inputs.password.label} type={inputs.password.type} errorText={inputs.password.errorText} inputRef={passwordRef} fullWidth />
          <BStack flexDirection='row' justifyContent='space-between' alignItems='center'>
            <BCheckBox label='Remember me' color='primary' inputRef={rememberMeRef} />
            <BLink>Forgot Password?</BLink>
          </BStack>              
        </BStack>          
        <BStack>
          <BButton buttonType='signIn' onClick={handleSubmit}>Sign in</BButton>
        </BStack> 
        <BStack>
          { formError ? <FormError errorText={formError} /> : '' }
        </BStack>
      </Item>
    </BGrid>
  );
};

export default SignIn;