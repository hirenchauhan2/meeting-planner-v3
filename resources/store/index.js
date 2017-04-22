import {login, getUserInfo, signup} from '../helpers/user.api'
import {unsetToken, setToken} from '~/helpers'
import jwtDecode from 'jwt-decode'

export const state = {
  user: null,
  profile: null
}

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  },
  SET_PROFILE (state, profile) {
    state.profile = profile || null
  },
  LOGOUT (state) {
    state.user = null
    state.profile = null
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  },
  userProfile (state) {
    return state.profile
  }
}

export const actions = {
  // login action
  login ({commit, dispatch}, payload) {
    return new Promise((resolve, reject) => {
      login(payload.email, payload.password)
        .then(data => {
          if (data.token) {
            getUserInfo(data.token).then(res => {
              const token = res.token
              setToken(token)
              const {payload: {data}} = jwtDecode(token)
              if (data.profile) {
                commit('SET_USER', data.user)
                commit('SET_PROFILE', data.profile)
              } else {
                commit('SET_USER', data.user)
              }
              resolve()
            })
          } else {
            resolve()
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  signup ({commit, dispatch, redirect}, payload) {
    return new Promise((resolve, reject) => {
      signup(payload)
        .then(res => {
          const token = res.token
          if (token) {
            setToken(token)
            const {payload: {data}} = jwtDecode(token)
            commit('SET_USER', data.user)
            return redirect('/')
          } else {
            resolve()
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // logout action
  logout ({commit}, payload) {
    unsetToken()
    commit('LOGOUT')
  }
}
