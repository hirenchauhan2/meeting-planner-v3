<template lang="html">
  <div class="meeting-view">
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="22" :md="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{  meeting && meeting.title }}</span>
            <el-button style="float: right;" type="danger">Delete This Schedule</el-button>
          </div>
          {{ meeting.description }}
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from '~plugins/axios'
import {getToken} from '../../helpers'
export default {
  layout: 'app',
  middleware: 'authenticated',
  data () {
    return {
      meeting: {}
    }
  },
  async asyncData ({params}) {
    const {id} = params
    try {
      const token = getToken()
      const {data} = await axios.get(`/meetings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return {
        meeting: data.meeting
      }
    } catch (e) {
      console.log(e)
      return {
        meeting: {}
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
