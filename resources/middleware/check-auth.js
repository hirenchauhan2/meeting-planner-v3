import {getUserFromCookie, getUserFromLocalStorage} from '~/helpers'

export default function ({isServer, store, req}) {
  const loggedUserData = isServer
    ? getUserFromCookie(req)
    : getUserFromLocalStorage()
  if (loggedUserData) {
    const {payload: {data}} = loggedUserData
    store.commit('SET_USER', data.user)
    if (data.profile) {
      store.commit('SET_PROFILE', data.profile)
    }
  }
}
