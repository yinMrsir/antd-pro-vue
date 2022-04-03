import router from '@/router';
import { message } from 'ant-design-vue';
import { sleep } from '@/utils'
import { basicRoutes, asyncRoutes } from '@/router/routes';

export default {
  /**
   * 通过接口获取静态数据
   * @param commit
   * @return {Promise<void>}
   */
  async getStatic({ commit }) {
    commit('SET_STATIC_DATA')
  },
  /**
   * 清除静态数据
   * @param commit
   */
  clearStatic({ commit }) {
    commit('SET_STATIC_DATA', {})
  },
  /**
   * 登录
   * @param commit
   * @param data
   * @return {Promise<unknown>}
   */
  login({ commit }, data = {}) {
    return new Promise(resolve => {
      commit('SET_USER_INFO', data)
      resolve()
    })
  },
  /**
   * 退出登录
   * @param commit 触发mutations
   * @param msg 退出提示文案
   * @param path 跳转页面路径 注意使用路由path
   * @param time 跳转页面间隔时间
   * @return {Promise<unknown>}
   */
  logout({ commit }, { msg, path = '/login', time }) {
    return new Promise(async resolve => {
      commit('SET_STATIC_DATA', {})
      commit('SET_USER_INFO', {})
      localStorage.clear()
      resolve()
      /**
       * 界面操作
       */
      msg && message.success(msg)
      time && (await sleep(time))
      path && router.push(path)
    })
  },
  /**
   * 获取路由
   * @param commit
   * @param data
   */
  getRouters({ commit }, data) {
    /**
     * 此处可以通过权限过滤不需要展示的路由，返回一个新的路由列表
     */
    const routers = basicRoutes.concat(asyncRoutes)
    commit('SET_ROUTERS', routers)
  }
}
