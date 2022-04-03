import { userInfo, getLocalStorage } from '@/utils/storage'

export default {
  userInfo: getLocalStorage(userInfo) || {},
  staticData: {},
  routers: []
}
