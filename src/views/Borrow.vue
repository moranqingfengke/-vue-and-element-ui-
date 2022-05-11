<template>
  <div class="borrow">
    <el-card>
      <el-table :data="books">
        <el-table-column prop="username" label="用户"></el-table-column>
        <el-table-column prop="bookname" label="书名"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Borrow',
  data () {
    return {
      // 书
      books: []
    }
  },
  methods: {
    async getbook () {
      const res = await this.$http.get('/borrow/getallrebook')
      this.books = res.data.message
    }
  },
  created () {
    this.getbook()
  }
}
</script>

<style lang="less" scoped>
.borrow{
  width: 100%;
  height: 100%;
  background:#f5f5f5 no-repeat center / contain;
  .el-card{
    height: 100%;
  }
}
</style>
