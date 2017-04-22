'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class User extends Lucid {

  static boot () {
    super.boot()

    /**
     * Hashing password before storing to the
     * database.
     */
    this.addHook('beforeCreate', function * (next) {
      this.password = yield Hash.make(this.password)
      yield next
    })
  }

  static get hidden () {
    return ['password']
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  contacts () {
    return this.hasMany('App/Model/Contact')
  }

  meetings () {
    return this.hasMany('App/Model/Meeting')
  }

  profile () {
    return this.hasOne('App/Model/Profile')
  }
}

module.exports = User
