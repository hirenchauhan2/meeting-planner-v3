<template lang="html">
  <div class="features">
  <el-row :gutter="20" type="flex" justify="center">
    <el-col :xs="8" :sm="6" :md="15" :lg="10">
      <div class="text-center">
        <h1>Scheduling Should Be Easy</h1>
        <p>Meeting Planner simplifies scheduling between people and groups
to help you focus your time on what's really important again.</p>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="10" type="flex" justify="center">
    <el-col :xs="8" :sm="6" :md="10" :lg="5">
      <el-card>
        <template slot="header">
          <h3>Scheduling</h3>
        </template>
        <p>Plan meetings with friends and colleagues in minutes, without the needless back and forth email chains.</p>
      </el-card>
    </el-col>
    <el-col :xs="8" :sm="6" :md="10" :lg="5">
      <el-card>
        <template slot="header">
          <h3>Groups</h3>
        </template>
        <p>Invite more people and easily find the most available times and places.</p>
      </el-card>
    </el-col>
    <span class="clearfix"></span>
    <el-col :xs="8" :sm="6" :md="10" :lg="5">
      <el-card>
        <template slot="header">
          <h3>Choosing Dates, Times &amp; Places</h3>
        </template>
        <p>Participants select times and dates that work well for them. Organizers choose the best.</p>
      </el-card>
    </el-col>
    <el-col :xs="20" :sm="15" :md="10" :lg="5">
      <el-card>
        <template slot="header">
          <h3>Invite by Secure Link</h3>
        </template>
        <p>If you wish, you can share a secure URL with participants via email.</p>
      </el-card>
    </el-col>
  </el-row>
  </div>

</template>

<script>
export default {
  layout: 'app',

  head() {
    return {
      title: 'Features | Meeting Planner'
    }
  }
}
</script>

<style lang="stylus">
</style>
