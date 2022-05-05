import { setError, setSuccess, setWarning } from '../fSetReply'
import BPost from '../fFetch'
import config from '../../config'

async function fVerifyPassword(currentPassword, token) {  
  try {
    const url = config.api.urls.user.verifyPassword  

    const data = {
      currentPassword,
      token
    }

    const fetchOptions = {
      headers: {        
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
  
    const verifyPasswordResult = await BPost(url, data, fetchOptions)    

    return verifyPasswordResult    
  } catch (error) {
    return setError(error)
  }
}

export default fVerifyPassword