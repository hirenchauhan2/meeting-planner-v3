<template>
  <div class="meetings">
    <el-row :gutter="10">
      <el-col :span="22">
        <h1>Showing All of your Meeting Schedules</h1>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <h1 v-if="meetings.length === 0">There are currently no schedules available</h1>
      <template v-else>
        <el-col :span="6" v-for="meeting in meetings" :key="meeting.id">
          <meeting-card :meeting="meeting"></meeting-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'

import MeetingCard from '~components/MeetingCard.vue'
import axios from '~plugins/axios'
import {getToken} from '../../helpers'
export default {
  layout: 'app',
  middleware: 'authenticated',
  components: {
    MeetingCard
  },
  async mounted () {
    try {
      await this.getMeetings()
    } catch (e) {
      console.log(e) // eslint-disable-linne
    }
  },
  computed: {
    ...mapGetters({
      meetings: 'meetings/allMeetings'
    })
  },
  methods: {
    ...mapActions({
      getMeetings: 'meetings/getMeetings'
    })
  }
}
</script>
<style lang="stylus" scoped>
.meetings
  width 80%
.meeting-text
  padding 10px
</style>
