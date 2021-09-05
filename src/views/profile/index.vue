<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="10" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="14" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="编辑基础信息" name="account">
                <account :user="user" />
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="password">
                <password />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'
import Password from './components/Password'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account ,Password},
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'tags'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        avatar: this.avatar,
        tags:this.tags
      }
    }
  }
}
</script>
