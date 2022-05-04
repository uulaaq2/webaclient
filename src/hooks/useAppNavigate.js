import React from 'react'
import { useNavigate } from 'react-router-dom'

const useAppNavigate = () => {
  const navigate = useNavigate()
  
  const appNavigate = (to) => {
    navigate(to)
  }

  return appNavigate

}

export default useAppNavigate