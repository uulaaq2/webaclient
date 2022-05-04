import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppWrapper'

const useSetUserContext = () => {
  const [value, setValue] = useState(false)
  const {getAppContext, setAppContext} = useAppContext()  

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