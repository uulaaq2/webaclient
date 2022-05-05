import { setError, setSuccess, setWarning } from './fSetReply'
import axios from 'axios'

async function BPost(url, data = {}, fetchOptions = {}) {
  fetchOptions.headers = { 
      ...fetchOptions.headers, 
      "Access-Control-Allow-Origin": "*"
  }

  try {
    const BPostResult = await axios.post(url, data, fetchOptions)

    return BPostResult.data
  } catch (error) {
    return setError(error)
  }

}

export default BPost