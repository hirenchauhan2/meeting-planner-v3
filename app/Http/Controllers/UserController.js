'use strict'

const User = use('App/Model/User')
// const Hash = use('Hash')

class UserController {
  *signup (request, response) {
    const {email, password} = request.post()

    const user = yield User.create({
      email,
      password
    })

    const token = yield this._generateToken(request, user, user)

    response.json({
      token
    })
  }

  *login (request, response) {
    const email = request.input('email')
    const password = request.input('password')
    const sessionAuth = request.auth.authenticator('session')
    try {
      yield sessionAuth.validate(email, password)
      const user = yield User.query().where('email', email).first()
      const token = yield this._generateToken(request, user, user)
      response.json({
        token
      })
    } catch (e) {
      response.unauthorized('Invalid credentails')
    }
  }

  *_generateToken (request, user, payload) {
    return yield request.auth.generate(user, payload)
  }

  *profile (request, response) {
    try {
      const isLoggedIn = yield request.auth.check()
      if (!isLoggedIn) {
        response.unauthorized('You need to login first')
        return
      }
      const user = request.authUser
      const profile = yield user.profile().fetch()
      if (!profile) {
        const token = yield this._generateToken(request, user, user)
        response.json({
          token,
          profile: false,
          message: 'You have not created your profile. Create it first.'
        })
        return
      }
      const profileToken = yield this._generateToken(request, user, {
        user,
        profile
      })
      response.json({
        token: profileToken
      })
      return
    } catch (e) {
      response.json({
        error: e
      })
      return
    }
  }
}

module.exports = UserController
