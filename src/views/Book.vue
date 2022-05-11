<template>
  <div class="book">
    <el-input
      placeholder="请输入内容"
      v-model="input"
      clearable>
    </el-input>
    <el-button @click="getbook()" type="primary" icon="el-icon-search">搜索</el-button>
    <el-button @click="getAllBooks()" type="primary" icon="el-icon-search">全部书籍列表</el-button>
    <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="bookname">
          <el-input v-model="form.bookname" placeholder="请输入书名"></el-input>
        </el-form-item>
        <el-form-item prop="bookauthor">
          <el-input v-model="form.bookauthor" placeholder="请输入作者"></el-input>
        </el-form-item>
        <el-form-item prop="bookprice">
          <el-input v-model="form.bookprice" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item prop="bookaddress">
          <el-input v-model="form.bookaddress" placeholder="请输入出版社"></el-input>
        </el-form-item>
        <el-form-item prop="bookdetail">
          <el-input v-model="form.bookdetail" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addbook()" type="primary">添加图书</el-button>
        </el-form-item>
    </el-form>
    <el-card>
      <el-table :data="books">
        <el-table-column prop="bookname" label="书名"></el-table-column>
        <el-table-column prop="bookauthor" label="作者"></el-table-column>
        <el-table-column prop="bookaddress" label="出版社"></el-table-column>
        <el-table-column prop="bookprice" label="价格"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="detail(scope.row.bookname)" type="primary" icon="el-icon-more" circle plain></el-button>
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
  name: 'Book',
  data () {
    return {
      // 搜索
      input: '',
      // 书
      books: [],
      // 详情
      bookdetail: '',
      // 表单
      form: {
        bookname: '',
        bookauthor: '',
        bookdetail: '',
        bookaddress: '',
        bookprice: ''
      },
      // 规则
      rules: {
        bookname: [
          { required: true, message: '请输入书名', trigger: 'blur' }
        ],
        bookauthor: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        bookaddress: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        bookprice: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        bookdetail: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取全部书籍列表
    async getAllBooks () {
      const res = await this.$http.get('/book/getbook')
      this.books = res.data.message
    },
    // 搜索书
    async getbook () {
      const res = await this.$http.post('/book/bookdetail', qs.stringify({ bookname: this.input }))
      this.books = res.data.message
      if (this.books.length === 0) {
        this.$message({
          showClose: true,
          message: '没有该书，请添加书',
          type: 'warning'
        })
      }
      this.input = ''
    },
    // 详情
    async detail (bookname) {
      const res = await this.$http.post('/book/bookdetail', qs.stringify({ bookname: bookname }))
      this.bookdetail = res.data.message[0].bookdetail
      this.$message({
        showClose: true,
        message: this.bookdetail,
        type: 'success',
        duration: 0
      })
    },
    // 删除图书
    async delbook (bookname) {
      const res = await this.$http.post('/book/deletebook', qs.stringify({ bookname: bookname }))
      if (res.data.status === 0) {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
        this.getAllBooks()
      } else {
        this.$message({
          showClose: true,
          message: '删除失败',
          type: 'error'
        })
      }
    },
    // 添加图书
    async addbook () {
      const res = await this.$http.post('/book/addbook', qs.stringify(this.form))
      if (res.data.status === 0) {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
        this.getAllBooks()
        this.form.bookname = ''
        this.form.bookauthor = ''
        this.form.bookprice = ''
        this.form.bookaddress = ''
        this.form.bookdetail = ''
      } else {
        this.$message({
          showClose: true,
          message: '添加失败',
          type: 'error'
        })
      }
    }
  },
  created () {
    this.getAllBooks()
  }
}
</script>

<style lang="less" scoped>
.book{
  width: 100%;
  height: 100%;
  background:#f5f5f5 no-repeat center / contain;
  .el-input{
    width: 80%;
  }
  .el-card{
    height: 100%;
  }
}
</style>
