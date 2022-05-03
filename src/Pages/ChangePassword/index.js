import moduleStyle from './style.css'
import globalStyle from '../../app.css'
import logo from '../../images/logo.png'

import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BStack from '../../Base/BStack'
import BBox from '../../Base/BBox'
import BGrid from '../../Base/BGrid'
import BTypography from '../../Base/BTypography'
import BDialog from '../../Base/BDialog'
import BButton from '../../Base/BButton'
import BLoadingButton from '../../Base/BLoadingButton'
import BTextField from '../../Base/BTextField'
import config from '../../config'
import BPaper from '../../Base/BPaper'
import fVerifyPassword from '../../functions/user/fVerifyPassword'
import fChangePassword from '../../functions/user/fChangePassword'
import { validateInputFields, clearErrors } from '../../functions/validateInputFields'
import BFormError from '../../Base/BAlerts/BFormError'
import { Password } from '@mui/icons-material'
import { setError, setSuccess, setWarning } from '../../functions/setReply'
import { bSetCookie } from '../../functions/bCookie'

const getToken = (token) => token.substring(0, token.length - 1) 
const getShowCurrentPassword = (token) => token.slice(-1) === '1' ? true : false

const ChangePassword = () => {
  document.title = config.urls.signIn.name + ' | ' + config.app.name
  
  const { token } = useParams()
  const navigate = useNavigate()

  const currentPasswordRef = useRef()
  const newPasswordRef = useRef()  
  const confirmNewPasswordRef = useRef()  
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(getShowCurrentPassword(token))
  const [inProgress, setInProgress] = useState(false)  
  const [erroredInputs, setErroredInputs] = useState([])
  const [formError, setFormError] = useState('')

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
    setErroredInputs: setErroredInputs
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

  async function handleVerifyCurrentPassword() {
    try {
      const verifyPasswordResult = await fVerifyPassword(currentPasswordRef.current.value, getToken(token))
      if (verifyPasswordResult.status === 'error') {
        throw new Error(verifyPasswordResult.message)
      }      
      if (verifyPasswordResult.status !== 'ok') {
        return setWarning('Invalid password')
      }

      return setSuccess()

    } catch (error) {
      return setError(error)
    }
  }

  async function handleSubmit() {    
    try {
      setInProgress(true)
      //clearErrors(inputs)
      const handleVerifyCurrentPasswordResult = await handleVerifyCurrentPassword()
      if (handleVerifyCurrentPasswordResult.status === 'error') {
        throw new Error(handleVerifyCurrentPasswordResult.message)
      }
      if (handleVerifyCurrentPasswordResult.status !== 'ok') {
        inputs.currentPassword.errorText = handleVerifyCurrentPasswordResult.message
        inputs.setErroredInputs((prev) => [inputs.currentPassword.ref.current, ...prev])
        setInProgress(false)

        return
      }          
      
      const validateInputFieldsResult = validateInputFields(inputs)
      if (validateInputFieldsResult === 'error') {
        throw new Error(validateInputFieldsResult.message)
      }
      
      if (validateInputFieldsResult.status !== 'ok') {
        setInProgress(false) 

        return
      }
      
      const changePasswordResult = await fChangePassword(newPasswordRef.current.value, getToken(token))      
      if (changePasswordResult.status !== 'ok') {
        throw new Error(changePasswordResult.message)
      }
      console.log(changePasswordResult)
      bSetCookie('token', changePasswordResult.token)

    } catch (error) {
      setInProgress(false)
      console.log(error)
      setFormError(error.message)
    }
  }

  return (
    <BGrid className={moduleStyle.mainContainer}>
      <BPaper className={moduleStyle.formContainer}>
        <img src={logo} alt='' className={globalStyle.logoTopLeft} />
        <BStack>
          <BTypography variant='h5' style={{marginBottom: '1.2rem'}}>
            Change password
          </BTypography>
        </BStack>
        <BStack spacing='1.2rem'>
          { showCurrentPassword 
            ? 
              <BTextField 
                label={inputs.currentPassword.label} 
                type={inputs.currentPassword.type} 
                errorText={inputs.currentPassword.errorText} 
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
      </BPaper>
    </BGrid>
  )
}

export default ChangePassword