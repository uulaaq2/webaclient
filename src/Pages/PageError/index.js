import React from 'react'
import { useParams } from 'react-router-dom'
import fsetPageTitle from '../../functions/fSetPageTitle'

const PageError = ({ urlInfo }) => {
  fsetPageTitle(urlInfo)

  const { message } = useParams()
  return (
    <div>
      { message }
    </div>
  );
};

export default PageError