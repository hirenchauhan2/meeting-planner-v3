'use strict'
const Helpers = use('Helpers')
const User = use('App/Model/User')
const Profile = use('App/Model/Profile')
// const Hash = use('Hash')

class UserController {
  *signup (request, response) {
    const {email, password} = request.post()

    const user = yield User.create({
      email,
      password
    })

    const token = yield this._generateToken(request, user, {user})

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
      const token = yield this._generateToken(request, user, {user})
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
        const token = yield this._generateToken(request, user, {user})
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

  *saveProfile (request, response) {
    const user = request.authUser
    let profile = user.profile().fetch()
    if (!profile) {
      profile = new Profile()
    }
    const {fname, lname, gender, mobile} = request.post()
    profile.fname = fname
    profile.lname = lname
    profile.gender = gender
    profile.mobile = mobile

    yield user.profile().save(profile)
    const token = yield this._generateToken(request, user, {
      user,
      profile
    })

    response.json({
      token
    })
    return
  }

  *updateAvatar (request, response) {
    const avatar = request.file('avatar', {
      maxSize: '2mb',
      allowedExtensions: ['jpg', 'png', 'jpeg']
    })

    const user = request.authUser

    const fileName = `${new Date().getTime()}.${avatar.extension()}`
    yield avatar.move(Helpers.storagePath(), fileName)

    if (!avatar.moved()) {
      response.badRequest(avatar.errors())
      return
    }
    let profile = user.profile().fetch()
    if (!profile) {
      profile = new Profile()
    }
    profile.profile_pic = avatar.uploadPath()
    yield user.profile().save(profile)

    const token = yield this._generateToken(request, user, {
      user,
      profile
    })

    response.json({
      token,
      message: 'Porfile Picture updated successfully'
    })
    return
  }
}

module.exports = UserController
