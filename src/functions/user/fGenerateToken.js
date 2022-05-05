import { setError, setSuccess, setWarning } from '../fSetReply'
import BPost from '../fFetch'
import config from '../../config'

async function fGenerateToken(token, expiresIn = null) {  
  try {
    const url = config.api.urls.user.generateToken  

    const data = {
      token,
      expiresIn
    }

    const fetchOptions = {
      headers: {        
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
  
    const generateTokenResult = await BPost(url, data, fetchOptions)  

    return generateTokenResult    
  } catch (error) {
    return setError(error)
  }
}

export default fGenerateToken