import { setError, setSuccess, setWarning } from '../setReply'
import BPost from '../bFetch'
import config from '../../config'

async function fVerifyPassword(password, token) {  
  try {
    const url = config.api.urls.user.verifyPassword  

    const data = {
      password,
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