'use strict'

const Lucid = use('Lucid')

class Contact extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Contact
