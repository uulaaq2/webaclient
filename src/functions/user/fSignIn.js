import { setError, setSuccess, setWarning } from '../fSetReply'
import BPost from '../fFetch'
import config from '../../config'

async function fSignIn(email, password) {  
  try {
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
    
    return signInResult    
  } catch (error) {
    return setError(error)
  }
}

export default fSignIn