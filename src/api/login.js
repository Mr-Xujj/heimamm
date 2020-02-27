import axios from "axios"

const instance = axios.create({
    baseURL : process.env.VUE_APP_BASEURL,
    // 跨域cookie
    withCredentials:true
});

// 登录 data参数
export function login (data){
    return instance({
        url:"/login",
        method:'post',
        data
    })
}
//  短信接口
export function sendsms (data){
    return instance({
        url:"/sendsms",
        method:'post',
        data
    })
}
//  用户注册接口
export function register (data){
    return instance({
        url:"/register",
        method:'post',
        data
    })
}