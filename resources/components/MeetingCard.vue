<template>
	<el-card class="meeting-card">
      <div slot="header">
        <nuxt-link style="line-height: 38px" :to="'meetings/'+meeting.id" class="clearfix" >{{ meeting.title }}</nuxt-link>
        <small>{{ humanizedTime(meeting.meetingDate) }}</small>
      </div>
      <p class="meeting-text">
        {{ meeting.description }}
      </p>
	</el-card>
</template>
<script>
import moment from 'moment'

export default {
  props: ['meeting'],
  methods: {
    humanizedTime (time) {
      return moment(time).format('llll')
    }
  }
}
</script>
<style lang="stylus" scoped>
.meeting-card
  margin-top 5px
</style>
