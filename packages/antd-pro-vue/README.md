# `antd-pro-vue`

> TODO: 基于ant-design-vue3封装的组件库，具有更多拿到即用的组件，通过json配置快速搭建页面。

## 使用 npm 或 yarn

```bash
$ npm install antd-pro-vue --save
```

```bash
$ yarn add antd-pro-vue
```

## 配置路由

main.js:
```
import antdProVue from 'antd-pro-vue';

app.use(antdProVue, {
  routesConfig: {
    history: 'hash',  // 默认history模式
    routes,           // 路由
    beforeEach: (router, { to, from, next }) => { next() }
    afterEach: (router, { to, from }) => {}
  }
});
```

## 组件引用
```
import { BasicLayout, FormPanel, SearchPanel, TablePanel } from "antd-pro-vue";

export default: {
  components: {
    BasicLayout,
    FormPanel,
    SearchPanel,
    TablePanel
  }
}
```

## 交流 & 提问

QQ交流群: 411121858

提问：https://github.com/yinMrsir/antd-pro-vue/issues