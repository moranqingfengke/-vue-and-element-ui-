import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入token处理函数
import auth from '@/utils/auth.js'
// 登陆路由
import Login from '@/views/Login.vue'
// 布局路由
import Layout from '@/views/Layout.vue'
// 用户信息路由
import Home from '@/views/Home.vue'
// 图书路由
import Book from '@/views/Book.vue'
// 需求路由
import Need from '@/views/Need.vue'
// 借阅路由
import Borrow from '@/views/Borrow.vue'

Vue.use(VueRouter)

const routes = [
  // 登录
  { path: '/login', component: Login },
  // 布局
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/book', component: Book },
      { path: '/need', component: Need },
      { path: '/borrow', component: Borrow }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 获取token
  const token = auth.getToken()
  // 不是访问登录，有没有token，跳转登录页面
  if (to.path !== '/login' && !token) return next('/login')
  // 其他情况放行
  next()
})

export default router
