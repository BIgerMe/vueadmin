<template>
  <el-form>
    <el-form-item label="名称">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="头像">
      <SingleImageUpload :avatar="user.avatar" @change-avatar="changeAvatar"></SingleImageUpload>
    </el-form-item>
    <el-form-item label="个人标签">
      <el-select style="width:80%" v-model="user.tags" filterable allow-create clearable multiple placeholder="请选择">
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import SingleImageUpload from '@/components/Upload/SingleImage'
import {update} from "@/api/user";

export default {
  components: { SingleImageUpload },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          avatar:'',
          tags:[]
        }
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('user/update', this.user)
        .then(() => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        })
    },
    changeAvatar(val){
      this.user.avatar = val
    }
  }
}
</script>
