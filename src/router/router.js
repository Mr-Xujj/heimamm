
import Vue from 'vue'
// 导入 vue-router
import VueRouter from 'vue-router'

//  导入登录组件
import login from "../views/login/login.vue"
//  导入首页组件
import index from "../views/index/index.vue"
import chart from "../views/index/chart/chart.vue"
import enterprise from "../views/index/enterprise/enterprise.vue"
import question from "../views/index/question/question.vue"
import subject from "../views/index/subject/subject.vue"
import user from "../views/index/user/user.vue"

// 导航守卫需要判断token
import { getToken } from '../utils/token'
// 按需导入 element-ui
import { Message } from 'element-ui'
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
      redirect: login
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: 'chart',
          component: chart
        },
        {
          path: 'enterprise',
          component: enterprise
        },
        {
          path: 'question',
          component: question
        },
        {
          path: 'subject',
          component: subject
        },
        {
          path: 'user',
          component: user
        },
      ]

    }
  ]
})

// 导航守卫-前置守卫
router.beforeEach((to, from, next) => {
  // 除了login 页面 都需要做登录判断
  if (to.path != "/login") {
    if (!getToken()) {
      Message.error('滚回登录页')
      next('/login')
    }else{
      next()
    }

  } else {

    next()
  }
});

export default router