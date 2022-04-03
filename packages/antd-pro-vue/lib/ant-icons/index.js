import * as antIcons from '@ant-design/icons-vue'

// 注册所有antIcon图标
export function setAntIcons(app) {
  Object.keys(antIcons).forEach(key => {
    app.component(key, antIcons[key])
  })
  app.config.globalProperties.$antIcons = antIcons
}

export default antIcons
