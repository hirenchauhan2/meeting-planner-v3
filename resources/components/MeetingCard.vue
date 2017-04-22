<template>
	<el-card class="meeting-card">
      <div slot="header">
        <h2>{{ meeting.title }}</h2>
        <small>{{ meetind.date }}</small>
        <el-button style="float: right" type="primary">View</el-button>
      </div>
      <p class="meeting-text">
        {{ meeting.description }}
      </p>
      <div slot="footer">
      	<el-button type="secondary">View</el-button>
      </div>
	</el-card>
</template>
<script>
export default {
	props: ['meeting']
}
</script>
<style lang="stylus" scoped>
	
</style>