import { setError, setSuccess, setWarning } from '../setReply'
import BPost from '../bFetch'
import { bSetCookie } from '../BCookie'
import config from '../../config'

async function fSignIn(email, password, setCookie = true, sessionCookie = true) {  
  const url = config.api.urls.user.signIn  
  const data = {
    email,
    password
  }
  const fetchOptions = {
    headers: {        
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }

  const signInResult = await BPost(url, data, fetchOptions)    
  
  if (setCookie) {
      bSetCookie('token', signInResult.token, sessionCookie)
  }
  
  return signInResult
}

export default fSignIn