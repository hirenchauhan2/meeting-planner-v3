<template>
    <div class="create-meeting">
        <h1>
        Create a new meeting schedule
      </h1>
        <el-form class="form" ref="meeting" :model="form" :rules="rules" @submit.native.prevent="onSubmit">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item prop="title">
                        <el-input v-model="form.title" placeholder="Meeting Title"></el-input>
                    </el-form-item>
                    <el-form-item prop="description">
                        <el-input v-model="form.description" type="textarea" :rows="2" placeholder="Description of meeting"></el-input>
                    </el-form-item>
                    <el-form-item v-for="(participant, index) in form.participants" :key="participant.key" :prop="'participants.' + index + '.value'" :rules="[
                     {
                       required: true, message: 'Participant email can not be null', trigger: 'blur'
                     }, {
                       message: 'Invalid email',
                       trigger: 'blur',
                       validator: participantValidator
                     }]">
                        <el-row :gutter="10">
                            <el-col :span="18">
                                <el-input v-model="participant.value" placeholder="Participant's Email"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-button @click.prevent="removeParticipant(participant)">Delete</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="addParticipant">New Participant</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="meetingDate">
                        <el-date-picker v-model="form.meetingDate" type="datetime" :clearable="true" placeholder="Select date and time">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="location">
                        <input type="text" id="place_finder" class="el-input__inner" v-model="form.location" placeholder="Enter location" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
            <el-form-item>
                <el-button class="create-button" :class="{error: creationError}" type="success" native-type="submit" :loading="loading">
                    Create Meeting
                </el-button>
                <el-button @click="resetForm">Reset</el-button>
            </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import {mapActions} from 'vuex'

import isEmail from 'validator/lib/isEmail' // eslint-disable-line
import {pick} from 'lodash'

export default {
  layout: 'app',
  name: 'CreateMeeting',
  // middleware: 'authenticated',
  head () {
    return {
      title: 'Create New Meeting Schedule',
      script: [
        {
          src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCBRFIqqMX4fBBnK9VtAC_wQMUAcEJVedQ&libraries=places'
        }
      ]
    }
  },
  mounted () {
    if (window.google) {
      const input = document.querySelector('#place_finder')
      const searchBox = new window.google.maps.places.SearchBox(input)
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces()
        if (places.length === 0) {
          return
        }
        const {formatted_address, name, place_id} = places[0]
        this.location = {
          formatted_address,
          name,
          gplaceId: place_id
        }
      })
    }
  },
  data () {
    return {
      location: null,
      form: {
        title: '',
        description: '',
        meetingDate: '',
        location: '',
        participants: [
          {
            key: 1,
            value: ''
          }
        ]
      },
      rules: {
        title: [
          {
            required: true,
            message: 'Please enter title',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: 'Please enter description',
            trigger: 'blur'
          }
        ],
        meetingDate: [
          {
            trigger: 'blur',
            message: 'Select datetime for meeting',
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error(rule.message))
              } else {
                callback()
              }
            }
          }
        ],
        location: [
          {
            required: true,
            message: 'Enter location for meeting',
            trigger: 'blur'
          }
        ]
      },
      loading: false,
      creationError: false
    }
  },
  methods: {
    ...mapActions({
      create: 'meetings/create'
    }),
    participantValidator (rule, value, callback) {
      if (!isEmail(value)) {
        callback(new Error(rule.message))
      } else {
        callback()
      }
    },
    onSubmit ($event) {
      this.$refs.meeting.validate(valid => {
        if (valid) {
          this.loading = true
          this.create({
            title: this.form.title,
            description: this.form.description,
            meetingDate: this.form.meetingDate,
            participants: this.form.participants,
            location: this.location
          })
            .then(data => {
              if (data.created) {
                this.loading = false
                this.resetForm()
                this.$notify({
                  title: 'Meeting Created',
                  message: 'Your meeting schedule has been registered',
                  type: 'success',
                  duration: 2000
                })
              }
            })
            .catch(err => {
              console.log(err) // eslint-disable-line
              this.$notify({
                title: 'Error',
                message: err.response.data.message ||
                  'There was some error. Please try again.',
                type: 'error',
                duration: 1500
              })
              this.loading = false
              this.creationError = true
              setTimeout(() => {
                this.creationError = false
              }, 1000)
            })
        }
      })
    },
    resetForm () {
      this.$refs.meeting.resetFields()
    },
    removeParticipant (item) {
      const index = this.form.participants.indexOf(item)
      if (index !== -1) {
        this.form.participants.splice(index, 1)
      }
    },
    addParticipant () {
      this.form.participants.push({
        key: Date.now(),
        value: ''
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.create-meeting
  animation fadeInUp .8s
  width 60vw
</style>
