'use strict'
const Meeting = use('App/Model/Meeting')
const Participant = use('App/Model/Participant')
const Location = use('App/Model/Location')

class MeetingController {
  * index (request, response) {
    const isLoggedIn = yield request.auth.check()
    if (!isLoggedIn) {
      response.unauthorized('You need to login first')
      return
    }
    const user = request.authuser
    const userMeetings = user.meetings().latest().fetch()
    if (!userMeetings) {
      response.json({
        messsage: 'No Meetings'
      })
      return
    }
    response.json({
      meetings: userMeetings
    })
    return
  }

  * store (request, response) {
    const isLoggedIn = yield request.auth.check()
    if (!isLoggedIn) {
      response.unauthorized('You need to login first')
      return
    }
    const {
      title,
      description,
      meetingDate,
      location,
      participants
    } = request.post()
    try {
      let meeting = new Meeting({
        title,
        description,
        meetingDate
      })
      // get the current user
      const user = request.authuser
      // save meeting schedule for user
      meeting = yield user.meetings().save(meeting)
      let loc = yield Location.query().where('glpace_id', location.glpace_id).fetch()
      if (loc) {
        meeting.location().associate(loc)
      } else {
        let newLoc = yield Location.create(location)
        meeting.location().associate(newLoc)
      }
      yield meeting.save()
      if (participants.length) {
        const particips = participants.map(p => ({
          email: p.value
        }))
        yield meeting.participants().createmany(particips)
      }
      response.json({
        meeting
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

module.exports = MeetingController
