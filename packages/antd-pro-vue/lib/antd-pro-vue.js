import FormPanel from './components/FormPanel/index.vue'
import SearchPanel from './components/SearchPanel/index.vue'
import TablePanel from './components/TablePanel/index.vue'
import BasicLayout from './components/layouts/basicLayout/index.vue'

import { setupRouter } from './routers'
import { setupAntd } from './antd'
import { setAntIcons } from './ant-icons'
import './assets/less/index.less';

let router = null;
const install = (app, { routesConfig }) => {
  // 使用antd
  setupAntd(app)
  // 使用antd-icon
  setAntIcons(app)
  // 路由
  router = setupRouter(app, routesConfig)
  return app;
}

const getRouter = () => router;

export {
  FormPanel,
  SearchPanel,
  TablePanel,
  BasicLayout,
  getRouter
}

export default {
  install
}
