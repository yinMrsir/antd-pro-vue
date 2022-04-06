import { createApp } from 'vue'
import antdProVue from 'antd-pro-vue'
import App from './App.vue'
import routes from './router'

createApp(App)
  .use(antdProVue, {
    routesConfig: {
      routes
    }
  })
  .mount('#app')
