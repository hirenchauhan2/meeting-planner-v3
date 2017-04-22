<template>
  <div id="app">
    <navbar></navbar>
    <div class="main-cnt">
      <nuxt></nuxt>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Navbar from '~components/Navbar.vue'
import MyFooter from '~components/Footer.vue'

export default {
  components: {
    Navbar,
    MyFooter
  }
}
</script>
<style lang="stylus">
@import "~assets/css/variable"
@import "~assets/css/animate"
@import "~assets/css/flex"
@import "~assets/css/typography"

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

html, body
   margin 0
   padding 0
   height 100%

#app
 height 100%

body
 font-family $font-family
 overflow auto
 font-weight 400
 -webkit-font-smoothing antialiased
 background-color $color-from-codrops-bg
 color $color-from-codrops

a
 color #4078c0
 text-decoration none

button, input, select, textarea
 font-family inherit
 font-size inherit
 line-height inherit
 color inherit

.main-cnt
 margin-top -80px
 padding 80px 0 120px
 box-sizing border-box
 min-height 100%
 display flex
 flex-direction column
 justify-content center
 align-items center


.container,
.page-container
 width 1140px
 padding 0 30px
 margin 0 auto

.page-container
 padding-top 55px
 h2
   font-size 28px
   color #1f2d3d
   margin 0

 h3
   font-size 22px

 h2, h3, h4, h5
   font-weight normal
   color #1f2f3d
   &:hover a
     opacity .4

   a
     float left
     margin-left -20px
     opacity 0
     cursor pointer
     &:hover
       opacity .4

 p
   font-size 14px
   color #5e6d82
   line-height 1.5em


@media (max-width 1140px)
 .container,
 .page-container
   width 100%


@media (max-width 768px)
 .container,
 .page-container
   padding 0 20px

</style>
