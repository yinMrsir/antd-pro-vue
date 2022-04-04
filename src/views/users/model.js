import { sleep } from '@/utils'

export default {
  state: {
    msg: '你好！'
  },
  mutations: {
    SET_MSG: (state, data = '') => {
      state.msg = data
    }
  },
  actions: {
    async setMsg({ commit }, data) {
      await sleep(2)
      commit('SET_MSG', data)
    }
  }
}
