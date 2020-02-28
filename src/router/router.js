
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
import { getToken, removeToken } from '../utils/token'
// 导入Vuex
import store from '../store/store'
// 按需导入 element-ui
import { Message } from 'element-ui'
import { userInfo } from "../api/user"
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
      component: login
    },
    // {
    //   path: '/',
    //   redirect: login
    // },
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
// 路由白名单 除了登录页不需要判断token其余都要
const whitePaths = ["/login"]

// 导航守卫-前置守卫
router.beforeEach((to, from, next) => {
  // 除了login 页面 都需要做登录判断 false不存在 toLocaleLowerCase不区分大小写
  if (whitePaths.includes(to.path.toLocaleLowerCase()) === false) {
    // 没有token 打回首页
    if (!getToken()) {
      Message.error('滚回登录页')
      next('/login')
    } else {
      // 有token要区分伪造token
      // next()

      userInfo().then(res => {
        window.console.log(res);
        // 如果获取成功 保存用户信息
        if (res.data.code === 200) {

          //   store.state.userInfo = res.data.data;
          //  // 用户头像 增加基地址
          //  store.state.userInfo.avatar = process.env.VUE_APP_BASEURL + "/" + store.state.userInfo.avatar;
          // window.console.log(store.state.userInfo)
          // 方法二
          res.data.data.avatar = process.env.VUE_APP_BASEURL + "/" +  res.data.data.avatar;
          store.commit("changeUserInfo",res.data.data)

          next()
        } else if (res.data.code === 206) {
          Message.error("俺老孙火眼金睛，竟敢伪造token"),
            removeToken()
          next('/login')
        }
      });
    }

  } else {

    next()
  }
});

export default router