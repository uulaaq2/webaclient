import { setError, setSuccess, setWarning } from '../fSetReply'
import BPost from '../fFetch'
import config from '../../config'

async function fChangePassword(newPassword, token) {  
  try {
    const url = config.api.urls.user.changePassword  

    const data = {
      newPassword,
      token
    }

    const fetchOptions = {
      headers: {        
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
  
    const changePasswordResult = await BPost(url, data, fetchOptions)    

    return changePasswordResult    
  } catch (error) {
    return setError(error)
  }
}

export default fChangePassword