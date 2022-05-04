import { setError, setSuccess, setWarning } from '../setReply'
import BPost from '../bFetch'
import config from '../../config'

async function fVerifyToken(token, includeUserData = null) {  
  try {
    const url = config.api.urls.user.verifyToken  

    const data = {
      token,
      includeUserData
    }

    const fetchOptions = {
      headers: {        
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
  
    const verifyTokenResult = await BPost(url, data, fetchOptions)
    
    return verifyTokenResult    
  } catch (error) {
    return setError(error)
  }
}

export default fVerifyToken