<template>
  <div class="signup-wrapper">
    <el-card class="signup-box">
      <template slot="header">
        <h1 class="signup--heading">
          Sign up for Meeting Planner
        </h1>
      </template>
      <el-form class="form" ref="signup" :model="form" :rules="rules"
        @submit.native.prevent="onSubmit">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="Your Email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item prop="password_confirmation">
          <el-input type="password" v-model="form.password_confirmation" placeholder="Confirm password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="signup-button" :class="{error: signupError}" type="success" native-type="submit" :loading="loading">
          Signup
          </el-button>
        </el-form-item>
      </el-form>
      <el-col :span="22" class="login-link">
        Already have an account? <nuxt-link to="/login">Login</nuxt-link> here!
      </el-col>
    </el-card>
  </div>
</template>
<script>
import isEmail from 'validator/lib/isEmail'
import {mapGetters, mapActions} from 'vuex'

export default {
  layout: 'app',
  middleware: 'guest',
  data () {
    return {
      form: {
        email: '',
        password: '',
        password_confirmation: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Please enter your email',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            message: 'Email is invalid',
            validator: (rule, value, callback) => {
              if (!isEmail(value)) {
                callback(new Error(rule.message))
              } else {
                callback()
              }
            }
          }
        ],
        password: [
          {
            required: true,
            message: 'Please enter the password',
            trigger: 'blur'
          }
        ],
        password_confirmation: [
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('Enter password confirmation'))
              } else if (value !== this.form.password) {
                callback(new Error('Passwords does not matching'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      loading: false,
      signupError: false
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      signup: 'signup'
    }),
    onSubmit ($event) {
      this.$refs.signup.validate(valid => {
        if (valid) {
          this.loading = true
          this.signup({
            email: this.form.email,
            password: this.form.password,
            password_confirmation: this.form.password_confirmation
          })
            .then(data => {
              this.loading = false
              this.$notify({
                title: 'Signup Success',
                message: 'You are now registered.',
                type: 'success',
                duration: 1500
              })
              this.$router.push(this.$route.query.redirect || '/')
            })
            .catch(err => {
              console.log(err) // eslint-disable-line
              this.$notify({
                title: 'Error',
                message: err.body.message ||
                  'There was some error. Please try again.',
                type: 'error',
                duration: 1500
              })
              this.loading = false
              this.signupError = true
              setTimeout(() => {
                this.signupError = false
              }, 1000)
            })
        }
      })
    }
  }
}
</script>
<style lang="stylus">
@import "~assets/css/variable"
$input-width = 25rem
.signup-wrapper
  align-self center
  margin-top 45px
  animation fadeInUp .8s
  .signup-box
    position relative
    width 30rem
    padding-bottom 10px
    .signup--heading
      text-align center
    .signup-button
      width 100%
      &.error
        animation shake .5s
    .login-link
        text-align center
        color $color-black-light
        font-size 1rem
        a
          font-size 1.1rem
          color $color-black-exact-light
    .form
      width $input-width
      margin 0 auto
      .el-input__inner
        height 2.5rem
        color $color-black-exact-light
        border-color $color-silver-light
        background-color transparent
        &:focus
          color $color-black
          border-color $color-black
</style>
