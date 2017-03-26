<template>
<div class="login-wrapper">
  <div class="bg"></div>
  <el-card class="login-box">
    <div slot="header">
      <h1 class="form--heading">Login</h1>
    </div>
    <el-form
      class="form"
      ref="form"
      :model="form"
      :rules="rules"
      @submit.native.prevent="onSubmit">
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="Username">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="Password">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-button"
          :class="{error: loginError}"
          type="success"
          native-type="submit"
          :loading="loading">
            Login
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  // locales,
  layout: 'app',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: 'Enter username', // this.$t('login.username'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Enter password', // this.$t('login.password'),
            trigger: 'blur'
          }
        ]
      },
      loading: false,
      loginError: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    // ...mapActions(['login', 'changeLang']),
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this
            .login({
              username: this.form.username,
              password: this.form.password
            })
            .then(data => {
              this.loading = false
              this.$router.push(this.$route.query.redirect || '/')
            })
            .catch(err => {
              this.$notify({
                title: 'Error', // this.$t('message.error'),
                message: err.message || '', // .$t('login.authFail'),
                type: 'error',
                duration: 1500
              })
              this.loading = false
              this.loginError = true
              setTimeout(
                () => {
                  this.loginError = false
                },
                500
              )
            })
        }
      })
    }
  }
}
</script>
<style lang="stylus">
// @import "../../assets/css/variable"
$input-width = 20rem
.login-wrapper
  align-self center
  .bg
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    width 100%
    height 100%
    background-size cover
    background-image url('~assets/img/login-bg.jpg')
    background-position 100%
  .login-box
    position relative
    width 400px
    .form
      width $input-width
      margin 0 auto
      .el-input__inner
        height 2.5rem
        // color $color-black-exact-light
        // border-color $color-silver-light
        &:focus
        background-color transparent
          // color $color-black
          // border-color $color-black
  .login-button
    width 100%
    &.error
      animation shake .5s

.el-card__header
        .form--heading
          text-align center

</style>
