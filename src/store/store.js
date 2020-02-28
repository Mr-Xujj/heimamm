// vue共享创库
import Vue from 'vue'

import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {}
    },
    mutations: {
        // newUserIfon就是router.js中 state.commit(res.data.data)数据
        changeUserInfo(state, newUserIfon) {
            state.userInfo = newUserIfon
        }
    }
})

export default store