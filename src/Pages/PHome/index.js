import React, { useState, useEffect } from 'react'
import fSetPageTitle from '../../functions/fSetPageTitle'
import { useAppContext } from '../../context/AppWrapper'
import useIsUserSignedIn from '../../hooks/useIsUserSignedIn'
import PageLoading from '../../Components/CPageLoading'
import CAppNavBar from '../../Components/CAppNavbar'
import Deneme from './Deneme'

const Home = ({ urlInfo }) => {
  fSetPageTitle(urlInfo)

  const [isUserSignedIn, setIsUserSignedIn] = useIsUserSignedIn(false)
  const { getAppContext } = useAppContext()
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    setIsUserSignedIn()
  }, [])

  useEffect(() => {
    if (isUserSignedIn === undefined) return    
    console.log('isUserSignedIn ', isUserSignedIn)
    setPageLoading(false)
  }, [isUserSignedIn])

  if (pageLoading) {
    return (
      <PageLoading />
    )
  }

  return (
    <>
      <CAppNavBar />
      <div>Home Page</div>
    </>
  )

};

export default Home;