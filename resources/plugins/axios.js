import axios from 'axios'

let options = {
  headers: {
    common: {}
  }
}
// The server-side needs a full url to works
if (process.SERVER_BUILD) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

export function setAuthHeader (token) {
  options.headers.common['Authorization'] = `Bearer ${token}`
}

export function removeAuthHeader () {
  delete options.headers.common['Authorization']
}

export default axios.create(options)
