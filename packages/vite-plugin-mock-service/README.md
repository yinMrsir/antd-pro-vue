# `vite-plugin-mock-service`

> TODO: description

## Usage

```
import { defineConfig } from 'vite'
import vitePluginMockService from 'vite-plugin-mock-service';

export default defineConfig({
  plugins: [
    vitePluginMockService({ port: 8000, mockDir: 'mock' })
  ],
})
```

目录结构：

```
├─ mock
│  ├─ user
│  │  ├─ index.js                        // [get]     /user
│  │  ├─ del.delete.js                   // [delete]  /user/del
│  │  ├─ update.put.js                   // [put]     /user/update
│  │  └─ add.post.js                     // [post]    /user/add
│  ├─ news
│  │  ├─ hot
│  │  │  ├─ update.post.js               // [post]    /news/hot/update
│  │  │  └─ index.js                     // [get]     /news/hot
│  │  └─ index.js                        // [get]     /news
```

生成数据：

- js文件生成数据(推荐)

req：请求信息

```
module.exports = req => {
  const obj = {
    "goodsClass": "女装",
    "goodsId|+1": 1,
    "goodsName": "@ctitle(10)",
    "goodsAddress": "@county(true)",
    "goodsStar|1-5": "★",
    "goodsImg": "@Image('100x100','@color','小甜甜')",
    "goodsSale|30-500": 30
  }
  const list = []
  const pageSize = req.query.pageSize || 10
  for (let i = 0; i < pageSize; i++) {
    list.push(obj)
  }
  return {
    code: 200,
    list,
    page: req.query.page || 1,
    pageSize
  }
}
```

- json文件生成数据

```
{
    "code": 200,
    "list": {
        "goodsClass": "女装",
        "goodsId|+1": 1,
        "goodsName": "@ctitle(10)",
        "goodsAddress": "@county(true)",
        "goodsStar|1-5": "★",
        "goodsImg": "@Image('100x100','@color','小甜甜')",
        "goodsSale|30-500": 30
  }
}
```

