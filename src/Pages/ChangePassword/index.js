import moduleStyle from './style.css'
import globalStyle from '../../app.css'
import logo from '../../images/logo.png'

import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BStack from '../../Base/BStack'
import BGrid from '../../Base/BGrid'
import BBox from '../../Base/BBox'
import BTypography from '../../Base/BTypography'
import BButton from '../../Base/BButton'
import BLoadingButton from '../../Base/BLoadingButton'
import BTextField from '../../Base/BTextField'
import config from '../../config'
import BPaper from '../../Base/BPaper'
import fVerifyPassword from '../../functions/user/fVerifyPassword'
import fChangePassword from '../../functions/user/fChangePassword'
import fGenerateToken from '../../functions/user/fGenerateToken'
import { validateInputFields, clearErrors } from '../../functions/validateInputFields'
import BFormError from '../../Base/BAlerts/BFormError'
import { setError, setSuccess } from '../../functions/setReply'
import { bSetCookie } from '../../functions/bCookie'
import { Grow } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Box } from '@mui/material'
import { ConstructionOutlined } from '@mui/icons-material'
import fSetPageTitle from '../../functions/fSetPageTitle'
import useAppNavigate from '../../hooks/useAppNavigate'

const getToken = (token) => token.substring(0, token.length - 3)
const getSetCookie = (token) => token.charAt(token.length - 3) === '1' ? true : false
const getRememberMe = (token) => token.charAt(token.length - 2) === '1' ? true : false
const getShowCurrentPassword = (token) => token.charAt(token.length - 1) === '1' ? true : false

const ChangePassword = ({ urlInfo }) => {
  fSetPageTitle(urlInfo)
  
  const { token } = useParams()
  const navigate = useAppNavigate()

  const [showCurrentPassword, setShowCurrentPassword] = useState(getShowCurrentPassword(token))  
  const [currentPasswordError, setCurrentPasswordError] = useState('')
  
  const currentPasswordRef = useRef()
  const newPasswordRef = useRef()  
  const confirmNewPasswordRef = useRef()  
  
  const [inProgress, setInProgress] = useState(false)  
  const [erroredInputs, setErroredInputs] = useState([])
  const [formError, setFormError] = useState('')
  const [passwordIsChanged, setPasswordIsChanged] = useState(false)

  const [inputs] = useState({
    currentPassword: {      
      name: 'Current password',
      label: 'Current password',
      type: 'password',
      errorText: '',
      ref: currentPasswordRef,
      required: showCurrentPassword,
      validate: showCurrentPassword
    },
    newPassword: {
      name: 'New password',
      label: 'New password',
      type: 'password',
      errorText: '',
      ref: newPasswordRef,
      required: true,
      validate: true
    },
    confirmNewPassword: {
      name: 'Confirm new password',
      label: 'Confirm new password',
      type: 'password',
      errorText: '',
      ref: confirmNewPasswordRef,
      match: newPasswordRef,
      matchLabel: 'New password',
      required: true,
      validate: true
    },
    inputErors: 0,
    setErroredInputs: setErroredInputs,
  })  

  useEffect(() => {
    if (showCurrentPassword) {
      inputs.currentPassword.ref.current.focus()
    } else  {
      inputs.newPassword.ref.current.focus()
    }
  }, [])

  useEffect(() => {    
    if (erroredInputs[0]) {
      erroredInputs[0].focus()
    }
  }, [erroredInputs])

  function handleCancel() {
    navigate(-1)
  }

  getToken(token)
  getShowCurrentPassword(token)
  getRememberMe(token)
  getSetCookie(token)
  async function handleVerifyCurrentPassword() {
    try {
      if (inputs.currentPassword.ref.current.value.replace(/ /g, "") === '') {

        return setSuccess()        
      }

      const verifyCurrentPasswordResult = await fVerifyPassword(currentPasswordRef.current.value, getToken(token))     
      if (verifyCurrentPasswordResult.status === 'error') {
        setFormError(verifyCurrentPasswordResult.message)

        return
      }
      if (verifyCurrentPasswordResult.status !== 'ok') {
        inputs.currentPassword.errorText = verifyCurrentPasswordResult.message
        inputs.setErroredInputs(() => [inputs.currentPassword.ref.current])

        return verifyCurrentPasswordResult
      }

      return setSuccess()
    } catch (error) {
      return setError(error)
    }
  }

  async function handleSubmit() {    
    try {
      clearErrors()
      setInProgress(true)

      if (showCurrentPassword) {
        const verifyCurrentPasswordResult = await handleVerifyCurrentPassword()
        if (verifyCurrentPasswordResult.status !== 'ok') {
          setInProgress(false)

          return
        }
      }

      const validateInputFieldsResult = validateInputFields(inputs)
      if (validateInputFieldsResult === 'error') {
        setFormError(validateInputFieldsResult.message)
        setInProgress(false)

        return
      }

      if (validateInputFieldsResult.status !== 'ok') {
        setInProgress(false)        

        return
      }

      const changePasswordResult = await fChangePassword(newPasswordRef.current.value, getToken(token))
      if (changePasswordResult.status === 'error') {
        setFormError(changePasswordResult.message)
        setInProgress(false)

        return
      }
      if (getSetCookie(token)) {
        const generateTokenResult = await fGenerateToken(getToken(token))
        if (generateTokenResult.status !== 'ok') {
          setFormError(generateTokenResult.message)
          setInProgress(false)

          return
        }

        const setCookieResult = bSetCookie('token', generateTokenResult.token, getRememberMe(token))
        if (setCookieResult.status !== 'ok') {
          setFormError(setCookieResult.message)
          setInProgress(false)

          return
        }
      }
      setInProgress(false)
      
      setPasswordIsChanged(true)
    } catch (error) {
      if (error.message) {
        setFormError(error.message)
      }
    } 
  }

  return (
    <BGrid className={moduleStyle.mainContainer}>
      <BPaper className={moduleStyle.formContainer}>
        <img src={logo} alt='' className={globalStyle.logoTopLeft} />
        <BStack>
          <BTypography variant='h5' style={{marginBottom: '1.2rem'}}>
            { !passwordIsChanged ? 'Change password' : '' }
          </BTypography>
        </BStack>
        { passwordIsChanged             
            ? 
                <PasswordIsChanged countDownFrom={10} redirectUrl={config.urls.home} />
            :
            <>
            <BStack spacing='1.2rem'>
            { showCurrentPassword 
              ? 
                <BTextField 
                  label={inputs.currentPassword.label} 
                  type={inputs.currentPassword.type} 
                  errorText={inputs.currentPassword.errorText || currentPasswordError} 
                  inputRef={currentPasswordRef}                 
                  fullWidth 
                />
              :
                ''
            }
            <BTextField label={inputs.newPassword.label} type={inputs.newPassword.type} errorText={inputs.newPassword.errorText} inputRef={newPasswordRef} fullWidth />
            <BTextField label={inputs.confirmNewPassword.label} type={inputs.confirmNewPassword.type} errorText={inputs.confirmNewPassword.errorText} inputRef={confirmNewPasswordRef} fullWidth />
          </BStack>      
          <BStack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <BButton buttonType='text' onClick={handleCancel}>Go Back</BButton>
            <BLoadingButton buttonType='submit' onClick={handleSubmit} loading={inProgress}>Set new password</BLoadingButton>
          </BStack>
          <BStack>
            { formError ? <BFormError message={formError} /> : '' }
          </BStack>
          </>
        }
      </BPaper>
    </BGrid>
  )
}

const PasswordIsChanged = ({ countDownFrom = null, redirectUrl = null }) => {
  const [counter, setCounter] = useState(countDownFrom)
  const navigate = useNavigate()
  
  useEffect(() => {

  }, [])

  useEffect(() => {
    if (countDownFrom === null) return

    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      handleRedirect()
    }
    return () => clearInterval(timer);    
  }, [counter]);

  function handleRedirect() {
    if (!redirectUrl)  {
      navigate('/')
    } else {
      navigate(redirectUrl.path)
    }
  }
  
  return (
    <BTypography component="div">
      <BBox sx={{ width: '100%'}}>
      <Grow in={true}>
        <Box>
          <BStack spacing={5} alignItems="center" justifyContent="center" style={{padding: "2rem"}}>
            <CheckCircleOutlineIcon color="success" style={{fontSize: "3rem"}} />
            <BBox sx={{ fontSize: 'h5.fontSize', m: 1 }}>
              New password is set
            </BBox>
            <BButton buttonType='dialogSuccess' onClick={handleRedirect}>
              {`Go to ${redirectUrl.name} page ${counter}`}
            </BButton>
          </BStack>
        </Box>
      </Grow>
      </BBox>
    </BTypography>
  )
}

export default ChangePassword