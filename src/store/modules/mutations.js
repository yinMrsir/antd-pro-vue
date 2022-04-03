import { userInfo, setLocalStorage } from '@/utils/storage'

export default {
  SET_STATIC_DATA: (state, data) => {
    state.staticData = data
  },
  SET_USER_INFO: (state, data) => {
    state.userInfo = data
    setLocalStorage(userInfo, data)
  },
  SET_ROUTERS: (state, data) => {
    state.routers = data
  }
}
