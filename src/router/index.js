import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [{
        path: '/welcome',
        component: Welcome
      }, {
        path: '/users',
        component: Users
      }, {
        path: '/rights',
        component: Rights
      }, {
        path: '/roles',
        component: Roles
      }]
    }
  ]
})
// 挂载路由导航守卫

// 由于我没有后台所以我就注掉这个导航守卫 权限设置

// router.beforeEach((to, from, next) => {
//   // to：将要访问的路径
//   // from：代表从哪个路径跳转而来
//   // next：是一个函数表示放行
//   // next()表示放行  next('/login')表示强制跳转到login
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
// })
export default router
