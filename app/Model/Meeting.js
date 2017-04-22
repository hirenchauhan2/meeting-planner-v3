'use strict'

const Lucid = use('Lucid')

class Meeting extends Lucid {
  user () {
    return this.belongsTo('App/Model/User')
  }

  location () {
    return this.hasOne('App/Model/Location')
  }

  participants () {
    return this.hasMany('App/Model/Participant')
  }
}

module.exports = Meeting
