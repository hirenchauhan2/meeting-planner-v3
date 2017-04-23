<template>
<div class="user-profile">
  <el-row :gutter="30">
      <el-col :span="10">
      <el-card :body-style="{ padding: '0px' }">
        <el-upload
          class="avatar-uploader"
          action="/users/me/avatar"
          name="avatar"
          :headers="{Authorization: 'Bearer ' + token}"
          :show-file-list="false"
          :on-preview="handlePreview"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          >
          <img v-if="userProfile" :src="userProfile.profile_pic" class="image">
          <template v-else>
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </template>
        </el-upload>
        <div style="padding: 14px;">
          <div class="bottom clearfix" v-if="userProfile">
            <h1>{{userProfile.fname}} {{userProfile.lname}}</h1>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="14">
      <el-form class="form" ref="profile" :model="form" :rules="rules"
        @submit.native.prevent="onSubmit">
        <el-form-item prop="fname">
          <el-input v-model="form.fname" placeholder="Your First Name"></el-input>
        </el-form-item>
        <el-form-item prop="lname">
          <el-input v-model="form.lname" placeholder="Your last Name"></el-input>
        </el-form-item>
        <el-form-item prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="male">Male</el-radio>
            <el-radio label="female">Female</el-radio>
            <el-radio label="other">Other</el-radio>
          </el-radio-group>

          <!-- <el-input v-model="form.lname" placeholder="Your last Name"></el-input> -->
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="Mobile Number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="signup-button" :class="{error: profileError}" type="success" native-type="submit" :loading="loading">
          Save Profile
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {getToken} from '../helpers'
export default {
  layout: 'app',
  middleware: 'authenticated',
  computed: {
    ...mapGetters({
      user: 'loggedUser',
      userProfile: 'userProfile'
    })
  },
  methods: {
    ...mapActions({
      saveProfile: 'saveProfile'
    }),
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === ('image/jpeg' || 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG or PNG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    },
    handlePreview (file) {
      console.log(file)
    },
    onSubmit () {
      this.$refs.profile.validate(valid => {
        if (valid) {
          this.loading = true
          this.saveProfile({
            fname: this.form.fname,
            lname: this.form.lname,
            gender: this.form.gender,
            mobile: this.form.mobile
          })
            .then(res => {
              this.$refs.profile.resetFields()
            })
            .catch(err => {})
        }
      })
    }
  },
  data () {
    return {
      token: getToken(),
      imageUrl: '',
      form: {
        fname: (this.userProfile && this.userProfile.fname) || '',
        lname: (this.userProfile && this.userProfile.lname) || '',
        gender: (this.userProfile && this.userProfile.gender) || '',
        mobile: (this.userProfile && this.userProfile.mobile) || ''
      },
      rules: {
        fname: [
          {
            required: true,
            message: 'Please enter your first name',
            trigger: 'blur'
          }
        ],
        lname: [
          {
            required: true,
            message: 'Please enter your last name',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: 'Please provide your mobile number',
            trigger: 'blur'
          }
        ],
        gender: [
          {
            required: true,
            message: 'Please select your gender',
            trigger: 'blur'
          }
        ]
      },
      loading: false,
      profileError: false
    }
  }
}
</script>

<style lang="stylus">
.user-profile
  align-self center
  margin-top 100px
.image
  width 200px
  display block
.avatar-uploader
  .el-upload
    border: 1px dashed #d9d9d9
    border-radius: 6px
    cursor: pointer
    position: relative
    overflow: hidden
.avatar-uploader
  .el-upload:hover
    border-color #20a0ff

.avatar-uploader-icon
  font-size 28px
  color #8c939d
  width 178px
  height 178px
  line-height 178px
  text-align center
.avatar
  width 178px
  height 178px
  display block

</style>
