import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

const getQueryParams = () => {
  const params = {}
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    ($0, $1, $2, $3) => {
      params[$1] = $3
    }
  )
  return params
}

export const extractInfoFromHash = () => {
  if (process.SERVER_BUILD) return
  const {id_token, state} = getQueryParams()
  return {
    token: id_token,
    secret: state
  }
}

export const setToken = token => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('token', token)
  Cookie.set('jwt', token)
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  Cookie.remove('jwt')
  window.localStorage.setItem('logout', Date.now())
}

export const getUserFromCookie = req => {
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('jwt='))

  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwtDecode(jwt)
}

export const getUserFromLocalStorage = () => {
  const token = getToken()
  return token ? jwtDecode(token) : null
}

export const getToken = () => {
  if (process.SERVER_BUILD) return
  return window.localStorage.getItem('token') || null
}
