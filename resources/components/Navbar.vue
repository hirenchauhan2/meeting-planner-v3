<style lang="stylus" scoped>
  .headerWrapper
    height 80px

  .header
    height 80px
    background-color rgba(32, 160, 255, 1)
    color #fff
    top 0
    left 0
    width 100%
    line-height 80px
    z-index 100
    position relative
    .container
      height 100%
      box-sizing border-box

    h1
      margin 0
      float left
      font-size 32px
      font-weight normal
      a
        color #fff
        text-decoration none
        display block

      span
        font-size 12px
        display inline-block
        width 34px
        height 18px
        border 1px solid rgba(255, 255, 255, .5)
        text-align center
        line-height 18px
        vertical-align middle
        margin-left 10px
        border-radius 3px

    .nav
      float right
      height 100%
      line-height 80px
      background transparent
      padding 0
      margin 0
      &::after
          content ''
          display block
          clear both

    .nav-logo,
    .nav-logo-small
      vertical-align sub

    .nav-logo-small
      display none

    .nav-item
      margin 0
      float left
      list-style none
      position relative
      cursor pointer
      margin-left 20px

      &:last-child
        cursor default
        margin-left 34px
        span
          opacity .8

      a
        text-decoration none
        color #fff
        display block
        padding 0 20px
        opacity .8

        &.nuxt-link-active,
        &:hover
          opacity 1

        &.nuxt-link-active
          font-weight: 700

          &::before
            content ''
            display block
            position absolute
            bottom 0
            left 0
            width 100%
            height 4px
            background #99d2fc

  .header-home
    position fixed
    top 0
    background-color rgba(32, 160, 255, 0)

  @media (max-width: 850px)
    .header
      .nav-logo
        display none

      .nav-logo-small
        display inline-block

      .nav-item
        margin-left 6px
        &:last-child
          margin-left 10px
        a
          padding: 0 5px

  @media (max-width: 700px)
    .header
      .container
        padding 0 12px

      .nav-item a,
      .nav-lang
        font-size 12px
        vertical-align top
</style>
<template>
  <div class="headerWrapper">
    <header class="header"
    ref="header"
    :style="headerStyle"
    :class="{
      'header-home': isHome
    }">
      <div class="container">
        <h1>
          <nuxt-link to="/">
            <img
              src="~assets/img/1492182527_calendar-clock.png"
              alt="element-logo"
              class="nav-logo">
            <img
              src="~assets/img/logo-main.svg"
              alt="element-logo"
              class="nav-logo-small"> Meeting Planner
          </nuxt-link>
        </h1>
        <ul class="nav">
          <li class="nav-item">
            <nuxt-link
              active-class="active"
              to="/features"
              exact>Features
            </nuxt-link>
          </li>
          <template v-if="!isAuthenticated">
            <li class="nav-item">
              <nuxt-link
                active-class="active"
                to="/login" exact>Login
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                active-class="active"
                to="/signup"
                exact>Sign up
              </nuxt-link>
            </li>
          </template>
          <template v-if="isAuthenticated">
          <li class="nav-item">
            <nuxt-link
              active-class="active"
              to="/meetings/create"
              exact
            >New Meeting</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link
                active-class="active"
                to="/meetings"
                exact
            >All Meetings</nuxt-link>
          </li>
          <li class="nav-item">
            <el-dropdown @command="handleCommand">
              <a href="#" class="el-dropdown-link" v-if="userProfile && userProfile.fname">
                {{ userProfile && userProfile.fname }}<i class="el-icon-caret-bottom el-icon--right"></i>
              </a>
              <a href="#" class="el-dropdown-link" v-else>
                {{loggedUser.email}}  <i class="el-icon-caret-bottom el-icon--right"></i>
              </a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="profile">  <nuxt-link to="/profile">Profile</nuxt-link>
                </el-dropdown-item>

                <el-dropdown-item command="logout">Logout</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </template>
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedUser', 'userProfile'])
  },
  data () {
    return {
      active: '',
      isHome: true,
      headerStyle: {}
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler () {
        this.isHome = /^index/.test(this.$route.name)
        this.headerStyle.backgroundColor = `rgba(32, 160, 255, ${this.isHome ? '0' : '1'})`
      }
    }
  },
  mounted () {
    function scroll (fn) {
      window.addEventListener(
        'scroll',
        () => {
          fn()
        },
        false
      )
    }
    scroll(() => {
      if (this.isHome) {
        const threshold = 200
        let alpha =
          Math.min(
            document.documentElement.scrollTop || document.body.scrollTop,
            threshold
          ) / threshold
        this.$refs.header.style.backgroundColor = `rgba(32, 160, 255, ${alpha})`
      }
    })
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    handleCommand (command) {
      if (command === 'logout') {
        this.logout()
        this.$router.push('/')
      }
    }
  }
}
</script>
