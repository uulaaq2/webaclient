import React, { useState, useEffect } from 'react'
import fSetPageTitle from '../../functions/fSetPageTitle'
import { useAppContext } from '../../context/AppWrapper'
import useIsUserSignedIn from '../../hooks/useIsUserSignedIn'
import PageLoading from '../../Components/PageLoading'

const Home = ({ urlInfo }) => {
  fSetPageTitle(urlInfo)

  const [isUserSignedIn, setIsUserSignedIn] = useIsUserSignedIn(false)
  const { getAppContext } = useAppContext()
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    setIsUserSignedIn()
  }, [])

  useEffect(() => {
    if (isUserSignedIn === undefined) return    
    
    //setPageLoading(!isUserSignedIn)
  }, [isUserSignedIn])

  if (pageLoading) {
    return (
      <PageLoading />
    )
  }

  return (
    <div>Home Page</div>
  )

};

export default Home;