<template>
  <div class="login-wrapper zoomInUp">
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
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            placeholder="Your Email">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Your Password">
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
import isEmail from 'validator/lib/isEmail'
import {mapActions} from 'vuex'
export default {
  layout: 'app',
  middleware: 'guest',

  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Enter email',
            trigger: 'blur'
          },
          {
            message: 'Enter valid email',
            trigger: 'blur',
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
            message: 'Enter password',
            trigger: 'blur'
          }
        ]
      },
      loading: false,
      loginError: false
    }
  },
  methods: {
    ...mapActions({
      login: 'login'
    }),
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.login({
            email: this.form.email,
            password: this.form.password
          })
            .then(() => {
              this.loading = false
              this.$router.push(this.$route.query.redirect || '/')
            })
            .catch(err => {
              this.loading = false
              this.loginError = true

              this.$notify({
                title: 'Error', // this.$t('message.error'),
                message: err.response.data || err.message || '', // .$t('login.authFail'),
                type: 'error',
                duration: 2000
              })

              setTimeout(() => {
                this.loginError = false
              }, 500)
            })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
$input-width = 20rem
.login-wrapper
  animation fadeInUp .8s
  margin-top 50px
  align-self center
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
