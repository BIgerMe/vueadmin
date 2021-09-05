<template>
  <el-form :model="user" :rules="rules" ref="changePassword">
    <el-form-item prop="oldPassword" label="原密码">
      <el-input v-model.trim="user.oldPassword" />
    </el-form-item>
    <el-form-item prop="newPassword" label="新密码">
      <el-input v-model.trim="user.newPassword" />
    </el-form-item>
    <el-form-item prop="newPasswordConfirm" label="确认新密码">
      <el-input v-model.trim="user.newPasswordConfirm" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit('changePassword')">保存更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          oldPassword: '',
          newPassword:'',
          newPasswordConfirm:''
        }
      }
    }
  },
  data(){
    var confirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      rules:{
        oldPassword:[
          {required:true,message:'必填'},
          {min:6,message: '最小长度6位'}
        ],
        newPassword:[
          {required:true,message:'必填'},
          {min:6,message: '最小长度6位'}
        ],
        newPasswordConfirm:[
          { validator: confirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/changePassword', this.user)
            .then(() => {
              this.$message({
                message: '密码修改成功',
                type: 'success'
              })
              setInterval(function(){
                window.location.reload()
              },1000)
            })
        }else{
          console.log('error submit')
          return false;
        }
      })
    }
  }
}
</script>
