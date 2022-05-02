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
import validateInputFields from '../../functions/validateInputFields'
import BFormError from '../../Base/BAlerts/BFormError'

const getToken = (token) => token.substring(0, token.length - 1) 
const getShowCurrentPassword = (token) => token.slice(-1) === '1' ? true : false

const ChangePassword = () => {
  document.title = config.urls.signIn.name + ' | ' + config.app.name
  
  const { token } = useParams()
  const navigate = useNavigate()
  const [showCurrentPassword, setShowCurrentPassword] = useState(getShowCurrentPassword(token))  
  const [currentPasswordError, setCurrentPasswordError] = useState('')
  const [checkPasswordInProgress, setCheckPasswordInProgress] = useState(false)
  const [prevCurrentPassword, setPrevCurrentPassword] = useState('')

  const currentPasswordRef = useRef()
  const newPasswordRef = useRef()  
  const confirmNewPasswordRef = useRef()  

  
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

  function handleSetPrevCurrentPassword() {
    setPrevCurrentPassword(inputs.currentPassword.ref.current.value)    
  }
  
  async function handleCheckCurrentPassword() {
    try {
      if (inputs.currentPassword.ref.current.value.replace(/ /g, "") === '') {
        setCurrentPasswordError('')
        setCheckPasswordInProgress(false)

        return
      }

      if (prevCurrentPassword === inputs.currentPassword.ref.current.value) return

      const verifyCurrentPasswordResult = await fVerifyPassword(currentPasswordRef.current.value, getToken(token))        
      if (verifyCurrentPasswordResult.status === 'error') {
        throw new Error(verifyCurrentPasswordResult.message)
      }
      if (verifyCurrentPasswordResult.status !== 'ok') {
        inputs.currentPassword.errorText = verifyCurrentPasswordResult.message
        inputs.setErroredInputs(currentPasswordRef.current)
        return
      }
    } catch (error) {
      setFormError(error)
    } finally {
      setCheckPasswordInProgress(false)
    }
  }

  async function handleSubmit() {
    if (checkPasswordInProgress) return
    
    try {
      const validateInputFieldsResult = validateInputFields(inputs)
      if (validateInputFieldsResult === 'error') {
        throw new Error(validateInputFieldsResult.message)
      }
      if (validateInputFieldsResult.status !== 'ok') return
    } catch (error) {
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
                errorText={inputs.currentPassword.errorText || currentPasswordError} 
                inputRef={currentPasswordRef}                 
                onFocus={handleSetPrevCurrentPassword}
                onBlur={handleCheckCurrentPassword}                
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