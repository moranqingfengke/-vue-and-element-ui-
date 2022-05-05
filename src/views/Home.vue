<template>
  <div class="home">
    <el-card>
      <el-table :data="users">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="deluser(scope.row.username)" type="danger" icon="el-icon-delete" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

import qs from 'qs'

export default {
  name: 'need',
  data () {
    return {
      // 图书
      users: []
    }
  },
  methods: {
    // 获取全部用户
    async getuser () {
      const res = await this.$http.get('/api/getuser')
      this.users = res.data.message
    },
    // 删除用户
    async deluser (username) {
      const res = await this.$http.post('/api/delete', qs.stringify({ username: username }))
      if (res.data.status === 0) {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
        this.getuser()
      } else {
        this.$message({
          showClose: true,
          message: '删除失败',
          type: 'error'
        })
      }
    }
  },
  created () {
    this.getuser()
  }
}
</script>

<style lang="less" scoped>
.home{
  width: 100%;
  height: 100%;
  background:#f5f5f5 no-repeat center / contain;
  .el-card{
    height: 100%;
  }
}
</style>
