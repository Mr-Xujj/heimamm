// 定义token的key
// 用作key的常量 一般写成大写
const KEY = "token"

// 保存token
export function setToken(token) {
    localStorage.setItem(KEY, token)
}
// 获取token
export function getToken() {
    return localStorage.getItem(KEY)
}
// 移除token
export function removeToken() {
    localStorage.removeItem(KEY)
}
