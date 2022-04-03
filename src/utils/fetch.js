import axios from 'axios';
import { message } from 'ant-design-vue';
import { userInfo, getLocalStorage } from '@/utils/storage'
import store from '@/store';
/**
 * 创建axios实例
 */
const httpService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 90000,
  headers: {'Content-Type': 'application/json'}
});

/**
 * request拦截器
 */
httpService.interceptors.request.use(
  (config) => {
    // 让每个请求携带token
    const userInfoData = getLocalStorage(userInfo)
    if (userInfoData.token) {
      config.headers.authorization = userInfoData.token;
    }
    return config;
  },
  /**
   * 请求错误处理
   * @param error
   */
  (error) => {
    Promise.reject(error);
  },
);

// respone拦截器
httpService.interceptors.response.use(
  (response) => response.data,
  /**
   * 请求错误处理
   * @param error
   * @return {Promise<never>}
   */
  (error) => {
    if (error && error.response) {
      if (error.response.status === 511) {
        store.dispatch('logout', {
          msg: '即将跳转登录页...',
          time: 1
        })
      }
      error.message = error.response.data.msg;
    } else {
      error.message = '连接到服务器失败';
    }
    message.error(error.message);
    return Promise.reject(error);
  },
);

/**
 * get请求
 * @param url 请求地址
 * @param params 参数
 * @return {Promise<unknown>}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService({
      url,
      method: 'get',
      params,
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  });
}

/**
 * post请求
 * @param url 请求地址
 * @param params 参数
 * @return {Promise<unknown>}
 */
export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService({
      url,
      method: 'post',
      data: params,
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  });
}

/**
 * put请求
 * @param url
 * @param params
 * @return {Promise<unknown>}
 */
export function put(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService({
      url,
      method: 'put',
      data: params,
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  });
}

/**
 * delete请求
 * @param url 请求地址
 * @param params 参数
 * @return {Promise<unknown>}
 */
export function del(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService({
      url,
      method: 'delete',
      params,
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  });
}

export default {
  get,
  post,
  put,
  del
};
