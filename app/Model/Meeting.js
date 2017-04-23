'use strict'

const Lucid = use('Lucid')

class Meeting extends Lucid {
  static scopeLatest (builder) {
    builder.orderBy('meetingDate', 'desc')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

  participants () {
    return this.hasMany('App/Model/Participant')
  }
}

module.exports = Meeting
