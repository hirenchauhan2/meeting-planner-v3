'use strict'
const Meeting = use('App/Model/Meeting')
const Location = use('App/Model/Location')
const Mail = use('Mail')

class MeetingController {
  *index (request, response) {
    const isLoggedIn = yield request.auth.check()
    if (!isLoggedIn) {
      response.unauthorized('You need to login first')
      return
    }
    const user = request.authUser
    let userMeetings = yield user.meetings().latest()
    if (!userMeetings) {
      response.json({
        messsage: 'No Meetings'
      })
      return
    }

    userMeetings = yield userMeetings.map(meeting => {
      const location = Location.find(meeting.location_id)
      return Object.assign({}, meeting, {location})
    })
    response.json({
      meetings: userMeetings
    })
    return
  }

  *show (request, response) {
    const meeting = yield Meeting.find(request.param('id'))
    if (meeting) {
      const location = yield Location.findBy('id', meeting.location_id)
      response.json({
        meeting: Object.assign({}, meeting, {location})
      })
      return
    }
  }

  *store (request, response) {
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
      let loc = yield Location.findBy('gplaceId', location.gplaceId)

      if (!loc) {
        loc = yield Location.create(location)
      }
      let meeting = new Meeting({
        title,
        description,
        meetingDate,
        location_id: loc.id
      })

      // get the current user
      const user = request.authUser
      // save meeting schedule for user
      yield user.meetings().save(meeting)

      if (participants.length) {
        const particips = participants.map(p => ({
          email: p.value
        }))
        yield meeting.participants().createMany(particips)

        for (var i = 0, l = particips.length; i < l; i++) {
          const p = particips[i]
          yield Mail.send(
            'emails.invite',
            {
              meeting,
              user,
              location: loc
            },
            message => {
              message.to(p.email)
              message.from('meeting-planner@gmail.com', 'Meeting Planner')
              message.subject('Meeting invite')
            }
          )
        }
      }

      response.json({
        success: true,
        meeting
      })
      return
    } catch (e) {
      console.log(e) // eslint-disable-line
      response.json({
        error: e
      })
      return
    }
  }
}

module.exports = MeetingController
