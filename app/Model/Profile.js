'use strict'

const Lucid = use('Lucid')

class Profile extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Profile
