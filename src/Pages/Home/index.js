import React, { useState, useEffect } from 'react'
import fSetDocumentTitle from '../../functions/fSetPageTitle'
import { useAppContext } from '../../context/AppWrapper'
import useIsUserSignedIn from '../../hooks/useIsUserSignedIn'

const Home = ({ urlInfo }) => {
  fSetDocumentTitle(urlInfo)
  const [isUserSignedIn, setIsUserSignedIn] = useIsUserSignedIn()
  const [pageLoading, setPageLoading] = useState(true)
  const [errorOnPageLoad, setErrorOnPageLoad] = useState(false)

  useEffect(() => {
    if (isUserSignedIn.status !== 'ok') {   
     setErrorOnPageLoad(true)
     setPageLoading(false)
    }
  }, [isUserSignedIn])

  if (errorOnPageLoad) {
    return 'error on page load'
  }

  if (pageLoading) {
    return 'page loading ...'
  }
  
  if ()
  return (
  );
};

export default Home;