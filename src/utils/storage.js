/**
 * 本地存储变量
 */
export const userInfo = 'userInfo'

/**
 * 获取localStorage存储数据
 * @param key
 * @return {any}
 */
export const getLocalStorage = key => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : false

/**
 * 设置localStorage数据
 * @param key
 * @param data
 */
export const setLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data))
