export const state = {
  isAuthenticated: false
}

export const getters = {
  isAuthenticated: state => state.isAuthenticated
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.sesion && req.session.user) {
      const token = req.session.user.token
      commit('authenticate', { token })
    }
  },
  authenticate ({ commit }, token) {
    commit('authenticate', { token })
  }
}

export const mutations = {
  authenticate (state, { token }) {
    localStorage.setItem('authToken', token)
    state.isAuthenticated = true
  },

  logout (state) {
    localStorage.removeItem('authToken')
    state.isAuthenticated = false
  }
}
