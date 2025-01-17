import axios from '~plugins/axios'
import {getToken} from './index'

export function login (email, password) {
  return new Promise((resolve, reject) => {
    axios
      .post('/login', {
        email,
        password
      })
      .then(data => resolve(data.data))
      .catch(err => reject(err))
  })
}

export function getUserInfo (token) {
  return new Promise(resolve => {
    axios
      .get('users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(data => {
        resolve(data.data)
      })
      .catch(() => {
        resolve({})
      })
  })
}

/* Signup user */
export function signup (userData) {
  return new Promise((resolve, reject) => {
    axios
      .post('/users', {
        ...userData
      })
      .then(data => resolve(data.data))
      .catch(e => reject(e))
  })
}

export function saveUserInfo (payload) {
  const token = getToken()
  return new Promise((resolve, reject) => {
    axios
      .post(
        '/users/me',
      {
        ...payload
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      .then(data => resolve(data.data))
      .catch(err => reject(err))
  })
}
