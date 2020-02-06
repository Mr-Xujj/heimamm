
import Vue from 'vue'
// 导入 vue-router
import VueRouter from 'vue-router'

//  导入登录组件
import login from "../views/login/login.vue"
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
//这里就是路由的配制项
routes: [
 {
path: '/login',
component: login
 },
 {
path: '/',
redirect: '/login'
 }
  ]
})

export default router