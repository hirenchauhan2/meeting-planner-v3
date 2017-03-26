<template>
  <section class="container">
    <img src="~assets/img/logo.svg" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Meeting Planner
    </h1>

    <nuxt-link to="/login">
      Login
    </nuxt-link> <br>
    <nuxt-link to="/signup">
      Signup
    </nuxt-link>
  </section>
</template>

<script>
export default {
  layout: 'app',
  head () {
    return {
      title: 'Meeting Planner | A Next Gen Planner'
    }
  }
}
</script>

<style scoped>
.title {
  margin: 30px 0;
}
</style>
