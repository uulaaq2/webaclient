import React from 'react'
import { useNavigate } from 'react-router-dom'

const CNavigate = ({ url }) => {
  const navigate = useNavigate()
  console.log('aaabbb ')
  return (
    navigate(url)
  )
}

export default CNavigate