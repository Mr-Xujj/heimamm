// 导入 抽取的 axios的请求对象
import instance from '../utils/requests '


// 学科 新增
export function enterpriseAdd(data) {
  return instance({
    url: "/enterprise/add",
    method: "post",
    data,
    
  });
}
// 学科 列表
export function enterpriseList(params) {
  return instance({
    url: "/enterprise/list",
    method: "get",
    params,
  });
}
// 学科 状态
export function enterpriseStatus(data) {
  return instance({
    url: "/enterprise/status",
    method: "post",
    data,
    
  });
}
// 学科 编辑
export function enterpriseEdit(data) {
  return instance({
    url: "/enterprise/edit",
    method: "post",
    data,
    
  });
}
// 学科 删除
export function enterpriseRemove(data) {
  return instance({
    url: "/enterprise/remove",
    method: "post",
    data,
    
  });
}
