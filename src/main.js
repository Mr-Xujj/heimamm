import Vue from 'vue'
import App from './App.vue'

//  导入路由
import router  from './router/router.js'
//  导入饿了么
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//  导入全局样式
import '../src/style/base.css'
// 注册
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
