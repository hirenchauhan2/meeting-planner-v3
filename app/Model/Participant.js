'use strict'

const Lucid = use('Lucid')

class Participant extends Lucid {
  meeting () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Participant
