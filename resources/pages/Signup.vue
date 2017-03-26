<template>
  <div class="signup-wrapper" v-show="!isAuthenticated">
    <div class="bg"></div>
    <el-card class="signup-box">
      <div slot="header">
        <h1 class="signup--heading">
          Sign up for Meeting Planner
        </h1>
      </div>
      <el-form class="form" ref="signup" :model="form" :rules="rules"
        @submit.native.prevent="onSubmit">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="Your Fullname"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="Your Email"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input type="password" v-model="form.confirmPassword" placeholder="Confirm password"></el-input>
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
  data () {
    return {
      form: {
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please enter your full name',
            trigger: 'blur'
          }
        ],
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
        username: [
          {
            required: true,
            message: 'Please enter the username',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please enter the password',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: 'Please enter password again',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            message: 'Password does not match',
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error(rule.message))
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
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    // ...mapActions(['signup']),
    onSubmit ($event) {
      this.$refs.signup.validate(valid => {
        if (valid) {
          this.loading = true
          this.signup({
            name: this.form.name,
            email: this.form.email,
            username: this.form.username,
            password: this.form.password
          })
            .then(data => {
              this.loading = false
              this.$notify({
                title: 'Signup Success',
                message: 'Successfully signed up. Please login now',
                type: 'success',
                duration: 1500
              })
              this.$router.push(this.$route.query.redirect || '/login')
            })
            .catch(err => {
              console.log(err); // eslint-disable-line
              this.$notify({
                title: 'Error',
                message: err.body.message ||
                  'There was some error. Please try again.',
                type: 'error',
                duration: 1500
              })
              this.loading = false
              this.signupError = true
              setTimeout(
                () => {
                  this.signupError = false
                },
                1000
              )
            })
        }
      })
    }
  }
}

</script>
<style lang="stylus">
@import "~assets/css/variable"
$input-width = 20rem
.signup-wrapper
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
    background-position 100%
    background-image url('~assets/img/login-bg.jpg')
  .signup-box
    position relative
    width 25rem
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
