import axios from 'axios'
import { getToken } from '../utils/token'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    //  跨域 携带cookie 
    withCredentials: true
})

//  暴露用户信息接口
export function userInfo() {
    return instance({
        url: "/info",
        method: 'get',
        // 设置请求头
        headers:{
            token: getToken()
        }
    })
}

// 退出接口
export function logout(){
    return instance({
        url:"/logout",
        method:"get",
        headers:{
            token:getToken()
        }
    })
}