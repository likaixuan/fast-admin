/**
 * @file http request 配置
 * @author likaixuan <1375502718@qq.com>
 */
import { message } from "ant-design-vue";
import axios from "axios";
import qs from "qs";
import { useUserStore } from "./store/modules/user";
import {router} from "@/router/index.js"
let request = axios.create({
  baseURL: "",
  timeout: 10000,
  //  transformRequest: [
  //    function (data) {
  //      if (data instanceof FormData) {
  //        return data;
  //      }
  //      // 过滤空字符串
  //      for (let key in data) {
  //        if (data[key] === null) {
  //          delete data[key];
  //        }
  //      }
  //      return qs.stringify(data, {
  //        allowDots: true,
  //      });
  //    },
  //  ],
});

// 拦截请求
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.userInfo) {
      config.headers.authorization = userStore.userInfo.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 拦截响应
request.interceptors.response.use(
  (res) => {
    const data = res.data;
    if (data.code > 0) {
      return data;
    } else {
      message.error(data.message);
      return Promise.reject(res);
    }
  },
  (error) => {
    if (error.response && [403, 401].indexOf(error.response.status) !== -1) {
      message.error("请登录");
 
      console.log(router,4123412)
      router.push("/login");
    } else {
      message.error("网络错误，请重试");
    }
    return Promise.reject(error);
  }
);

export default request;
