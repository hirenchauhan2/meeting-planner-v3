'use strict'

const Lucid = use('Lucid')

class Meeting extends Lucid {
  user () {
    return this.belongsTo('App/Model/User')
  }

  place () {
    return this.hasOne('App/Model/Place')
  }

  attendees () {
    return this.belongsToMany('App/Model/User')
  }
}

module.exports = Meeting
