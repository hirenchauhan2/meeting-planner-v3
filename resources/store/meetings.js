import {create, getMeetings} from '../helpers/meetings.api'

export const state = {
  meetings: []
}

export const mutations = {
  SET_MEETINGS (state, meetings) {
    state.meetings = meetings
  },

  ADD_MEETING (state, meeting) {
    state.meetings = [meeting, ...state.meetings]
  },

  UPDATE_MEETING (state, meeting) {},

  REMOVE_MEETING (state, meeting) {
    state.meetings = state.meetings.filter(m => m.id !== meeting.id)
  },

  REMOVE_MEETINGs (state) {
    state.meetings = []
  }
}

export const getters = {
  allMeetings (state) {
    return state.meetings
  }
}

export const actions = {
  create ({commit, dispatch}, payload) {
    return new Promise((resolve, reject) => {
      create(payload)
        .then(res => {
          if (res.success) {
            commit('ADD_MEETING', res.meeting)
            resolve({
              created: true
            })
          } else {
            resolve({
              created: false
            })
          }
        })
        .catch(err => resolve(err))
    })
  },
  getMeetings ({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      getMeetings()
        .then(res => {
          if (res.meetings) {
            commit('SET_MEETINGS', res.meetings)
            resolve({})
          }
          resolve()
        })
        .catch(err => resolve(err))
    })
  }
}
