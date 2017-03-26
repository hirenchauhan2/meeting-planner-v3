<template>
  <div id="app-main">
    <div class="app-wrapper">
      <div class="app-container" :class="{active: isAuthenticated}">
        <nuxt></nuxt>
      </div>
      <my-footer></my-footer>
    </div>
  </div>
</template>

<script>
import MyFooter from '~components/Footer.vue'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  components: {
    MyFooter
  }
}
</script>
<style lang="stylus">
@import "~assets/css/variable"
@import "~assets/css/animate"
@import "~assets/css/flex"

::-webkit-scrollbar
  width 4px
  height 4px
  background-color $color-gray
::-webkit-scrollbar-button
::-webkit-scrollbar-track
  display none
::-webkit-scrollbar-thumb
  background-color $color-silver-light
::-webkit-scrollbar-thumb:hover
  background-color $color-black-exact-light

body
  margin 0
  padding 0
  font-size .75rem
  background-color $color-from-codrops-bg
  color $color-from-codrops

#app-main
  display flex
  width 100%
  height 100vh
  .app-wrapper
    flex 1
    display flex
    flex-flow column
    overflow-x hidden
    .app-container
      position relative
      flex 1
      display flex
      justify-content center
      margin 0
      padding 1rem
      background-color #fff
      overflow auto
      &.active
        margin 1rem
</style>
