
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
      // 所有人都能访问
      meta:{
        power:["超级管理员","管理员","老师","学生"]
      },
      children: [
        {
          // 数据
          path: 'chart',
          component: chart,
          meta:{
            power:["超级管理员","管理员","老师"]
          }
        },
        {
          path: 'enterprise',
          component: enterprise,
          meta:{
            power:["超级管理员","管理员","老师"]
          }
        },
        {
          path: 'question',
          component: question,
          meta:{
            power:["超级管理员","管理员","老师","学生"]
          }
        },
        {
          path: 'subject',
          component: subject,
          meta:{
            power:["超级管理员","管理员","老师"]
          }
        },
        {
          path: 'user',
          component: user,
          meta:{
            power:["超级管理员","管理员"]
          }
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
        // window.console.log(res);
        // 如果获取成功 保存用户信息
        if (res.data.code === 200) {

          // 如果禁用返回登录页  status=0禁用
          if(res.data.data.status===0){
            // 禁用状态
            Message.warning("你已被关小黑屋")
            next('/login')

          }else{
            res.data.data.avatar = process.env.VUE_APP_BASEURL + "/" +  res.data.data.avatar;
            store.commit("changeUserInfo",res.data.data)
            window.console.log(to)
            window.console.log(res.data.data)
            // meta访问白名单-权限
            if(to.meta.power.includes(res.data.data.role)){
              // 能访问
              next()
            }else{
              Message.warning("逼格不够，充值使你强大")
            }
           
          }
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