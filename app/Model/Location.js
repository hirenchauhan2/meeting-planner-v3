'use strict'

const Lucid = use('Lucid')

class Location extends Lucid {
  meeting () {
    return this.belongsTo('App/Model/Meeting')
  }
}

module.exports = Location
