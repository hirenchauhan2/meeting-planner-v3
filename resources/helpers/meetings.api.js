import axios from '~plugins/axios'
import {getToken} from './index'

export const create = data => {
  const token = getToken()
  return new Promise((resolve, reject) => {
    axios
      .post(
        '/meetings',
      {
        ...data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      .then(data => resolve(data.data))
      .catch(err => resolve(err))
  })
}

export const getMeetings = () => {
  const token = getToken()
  return new Promise((resolve, reject) => {
    axios
      .get('/meetings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(data => resolve(data.data))
      .catch(err => resolve(err))
  })
}
