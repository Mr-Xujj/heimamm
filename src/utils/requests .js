import axios from "axios"
import { getToken} from "./token"


const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    //  跨域 携带cookie 
    withCredentials: true
})

// 为instance添加拦截器
// 请求前
instance.interceptors.request.use(function (config) {
    config.headers.token = getToken()
    return config;
  }, function (error) {
    
    return Promise.reject(error);
  });

// 响应数据
instance.interceptors.response.use(function (response) {
   
    return response.data;
  }, function (error) {
   
    return Promise.reject(error);
  });
  export default instance
