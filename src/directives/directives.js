import Vue from 'vue'
// 判断用户信息
import store from '../store/store'

Vue.directive("power", {
    inserted: function (el, binding) {
        window.console.log(el)
        window.console.log(binding)
        if (binding.value.includes(store.state.userInfo.role)) {
            // 存在则移除
            el.parentNode.removeChild(el)
        }
    }
})
