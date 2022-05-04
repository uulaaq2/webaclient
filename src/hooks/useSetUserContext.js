import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppWrapper'

const useSetUserContext = ( redirectTo = '/' ) => {
  const [value, setValue] = useState(false)
  const {getAppContext, setAppContext} = useAppContext()

  const navigate = useNavigate()

  const setUser = (user) => {
    setAppContext((prev) => {
      return { ...prev,
        user: {
          ...user
        }
      }
    })

    setValue(true)
  } 
  
  return [value, setUser]
};

export default useSetUserContext