import request from "../request";


export default class User {
    // 验证码
    static getVerifyCodeUrl = '/Admin/getVerifyCode'

    // 登录
    static login = (params) => {
        return request.post('/Admin/Sys/User/login',params)
    }

    // 获取路由及权限
    static getMyGrantModule = (params) => {
        return request.post('/Admin/Sys/User/getMyGrantModule',params)
    }

}