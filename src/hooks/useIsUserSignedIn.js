import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppWrapper'
import fVerifyToken from '../functions/user/fVerifyToken'
import { bGetCookie } from '../functions/bCookie'
import CPageError from '../Components/CPageError'
import { setError, setSuccess, setWarning } from '../functions/setReply'
import useSetUserContext from './useSetUserContext'

const useIsUserSignedIn = ( SignInfailUrl ) => {
  const [value, setValue] = useState(false)  
  const [isUserContextSet, setIsUserContextSet] = useSetUserContext()

  useEffect(() => {
    const main = async () => {

      if (appContext.hasOwnKey('user')) {
        setValue(setSuccess())

        return
      }


      const getTokenResult = bGetCookie('token')
      if (getTokenResult.status === 'error') {        
        setValue(setError(getTokenResult.message))

        return
      }
      if (getTokenResult.status !== 'ok') {
        setValue(setWarning('No token found'))

        return
      }
      

      const verifyTokenResult = await fVerifyToken(token, true)
      if (verifyTokenResult.status !== 'ok') {
        setValue(setWarning(verifyTokenResult.message))

        return
      }
      if (verifyTokenResult.status !== 'ok') {

      }


      setIsUserContextSet(verifyTokenResult.user)   
    }

    main()
  }, [])

  useEffect(() => {    
    setValue(setSuccess())
  }, [isUserContextSet])

  return value
}

export default useIsUserSignedIn