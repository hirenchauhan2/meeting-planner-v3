<template>
  <div class="meetings">
    <el-row :gutter="10">
      <el-col :span="24">
        <h1>Showing All of your Meeting Schedules</h1>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <h1>There are currently no schedules available</h1>
      <!-- <el-col :span="6" v-for="meeting in meetings" :key="meeting.id">
        <meeting-card :meeting="meeting"></meeting-card>
      </el-col> -->
    </el-row>
  </div>
</template>
<script>
import MeetingCard from '~components/MeetingCard.vue'
import axios from '~plugins/axios'

export default {
  layout: 'app',
  middleware: 'authenticated',
  components: {
    MeetingCard
  },
  async asyncData () {
    try {
      let { data } = await axios.get(`/user/meetings`)
      return {
        meeting: data.meetings
      }
    } catch (e) {
      console.log(e); // eslint-disable-linne
      return {
        meetings: []
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.meeting-text
  padding 10px
</style>
