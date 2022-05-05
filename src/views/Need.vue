<template>
  <div class="need">
    <el-card>
      <el-table :data="books">
        <el-table-column prop="bookname" label="书名"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="delbook(scope.row.bookname)" type="danger" icon="el-icon-delete" circle plain></el-button>
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
      books: []
    }
  },
  methods: {
    // 获取全部待添加图书
    async getbooks () {
      const res = await this.$http.get('/need/getneed')
      this.books = res.data.message
    },
    // 删除图书
    async delbook (bookname) {
      const res = await this.$http.post('/need/deleteneed', qs.stringify({ bookname: bookname }))
      if (res.data.status === 0) {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
        this.getbooks()
      }
    }
  },
  created () {
    this.getbooks()
  }
}
</script>

<style lang="less" scoped>
.need{
  width: 100%;
  height: 100%;
  background:#f5f5f5 no-repeat center / contain;
  .el-input{
    width: 72%;
  }
  .el-card{
    height: 100%;
  }
}
</style>
