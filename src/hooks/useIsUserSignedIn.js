import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppWrapper'
import fVerifyToken from '../functions/user/fVerifyToken'
import { bGetCookie } from '../functions/bCookie'
import CPageError from '../Pages/PageError'
import { setError, setSuccess, setWarning } from '../functions/setReply'
import useSetUserContext from './useSetUserContext'
import useAppNavigate from './useAppNavigate'
import  config from '../config'

const useIsUserSignedIn = ( signInSuccessUrl = null, SignInfailUrl = null ) => {
  const [value, setValue] = useState()
  const { getAppContext } = useAppContext()
  const [userContext, setUserContext] = useSetUserContext()
  const appNavigate = useAppNavigate()
  
  // run main function on first run of hook
  useEffect(() => {
    main()
  }, [])

  // main function start
  const main = async () => {

    // check if user context set
    if (getAppContext.hasOwnProperty('user')) {
      setValue(true)

      return
    }

    // check if token exist
    const getCookieTokenResult = bGetCookie('token')
    if (getCookieTokenResult.status === 'error') {
      appNavigate(SignInfailUrl || config.urls.error.path + '/' + getCookieTokenResult.message)

      return
    }
    
    const token = getCookieTokenResult.value    

    // check if token exist
    // if exists then verify token
    // if token is not verified, navigate to Sign in
    if (token) {
      const verifyTokenResult = await fVerifyToken(token, true)
      if (verifyTokenResult.status !== 'ok') {
        appNavigate(config.urls.user.signIn.path)

        return
      }

      setUserContext(verifyTokenResult.user)      
      setValue(true)

      return
    }

    // No user context object or token is found
    // navigate to public
    appNavigate(config.urls.public.path)

  // main function end 
  }

  // return isUserSignedIn value and main function
  return [value, main]
}

export default useIsUserSignedIn