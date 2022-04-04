/**
 * @author mir 542968439@qq.com
 */
import { createStore } from 'vuex'
import state from '@/store/modules/state';
import actions from '@/store/modules/actions';
import getters from '@/store/modules/getters';
import mutations from '@/store/modules/mutations';
/**
 * 加载layouts,view文件下的model
 */
const layoutModules = import.meta.globEager('../layouts/**/model.js')
const viewModules = import.meta.globEager('../views/**/model.js')
const files = {...layoutModules, ...viewModules}

const modules = {}
Object.keys(files).forEach((key) => {
  let strKey = key.replace('/model.js', '')
  modules[strKey.substr(strKey.lastIndexOf('/') + 1)] = files[key].default
})
/**
 * 加入namespaced:true，用于解决vuex命名冲突，请勿修改。
 */
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})

/**
 * 创建Store
 */
const store = createStore({
  state,
  getters,
  actions,
  mutations,
  modules,
})

/**
 * 使用vuex
 * @param app
 */
export function setupStore(app) {
  app.use(store)
}

export default store
