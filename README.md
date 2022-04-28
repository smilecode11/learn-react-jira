# React 实战

## 配置 eslint、 prettier 和 commitlint 规范工程

- Prettire 格式化代码
  - 安装 Prettier `cnpm install --save-dev --save-exact prettier`
    - 创建配置文件 `echo {}> .prettierrc.json`
    - 借助 Pre-commit Hook 实现自动格式化 `npx mrm@2 lint-staged`
      - 安装 `cnpm i -D husky lint-staged`
      - 添加 .husky 文件目录, 并添加 pre-commit 命令
      - 配置 package.json()
        ```json
        {
        	"lint-staged": {
        		"*.{js,css,md,ts,tsx}": "prettier --write"
        	}
        }
        //  git commit 时即触发 pre-commit 钩子, 运行 lint-staged 命令, 对 js, css, md, ts, tsx 文件执行格式化
        ```
  - 添加 commitlint, 实现 commit 约束
    - 安装 `cnpm install --save-dev @commitlint/config-conventional @commitlint/cli`
      - 执行命令 `echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js`
    - 将 commitlint 添加到 .husky
      - 执行命令 `npx husky add .husky/commit-msg "yarn commitlint --edit $1"`
  - Prettire 和 ESLint 冲突问题
    - 安装依赖 `cnpm i -D eslint-config-prettier`
    - 配置 package.json, 修改 lint 配置, 添加 prettire
      ```json
      {
      	"eslintConfig": {
      		"extends": ["react-app", "react-app/jest", "prettier"]
      	}
      }
      ```

## Mock 方案对比

- 代码侵入(直接写死 mock 数据, 或请求本地 JSON)
- 请求拦截(Mock.js)
- 接口管理工具(rap, yapi)
- 本地 node 服务器(json-server), 全局安装 `cnpm i -g json-server`
  - 优点: 配质检单, 0 代码, 30 秒启动一个 REST API Server, 自定义程度高, 增删改查真实模拟
  - 安装依赖 `cnpm i -D json-server`
  - 新建文件夹 **json_server_mock**/db.json
  - 修改 package.json, 添加启动命令 `"json-server": "json-server __json_server_mock__/db.json --watch --port 9001"`
  - 执行命令 `npm run json-server` 开始使用
  - 添加中间件, 修改执行命令 `"json-server": "json-server __json_server_mock__/db.json --watch --port 9001 --middlewares ./__json-server__mock__/middleware.js"`
- REST API
  ```
  GET     /tickets      //  列表
  GET     /tickets/12   //  详情
  POST    /tickets      //  增加
  PUT     /tickets/12   //  替换
  PATCH   /tickets/1    //  修改
  DELETE  /tickets/12   //  删除
  ```

## 使用强类型语言 TypeScript

- Utility type: Partial Omit Parameters

## context 使用

- 管理全局状态

## CSS-in-JS

- Emotion

  - 安装 `cnpm i -S @emotion/react @emotion/styled`
  - 安装 vscode 插件 `vscode-styled-components`

- grid 和 flex 使用
  - 考虑, 是一维布局还是二维布局, 一般莱索, 一维使用 flex, 二维使用 grid
  - 考虑是从内容出发还是从布局出发
    - 从内容出发: 有一组内容(数量不固定), 希望他们均匀分布在容器中, 由内容自动填充, 使用 flex
    - 从布局出发: 先规划网格(数量一般固定), 再把元素往里填充. 使用 grid

### 页面交互

- 处理请求时交互 useAsync 封装
- 处理请求登录全局 loading
- 处理请求失败全局 error

### 自定义头部信息

- 方案一: 使用 react-helmet 进行支持
- 方案二: 自定义 hook 实现

### Param 参数获取使用

- 自定义 hook `useUrlQueryParam` 实现
- `why-did-you-render` 库的使用的错误排查 [why-did-you-render git](https://github.com/welldone-software/why-did-you-render)

  - 安装 `cnpm i -D @welldone-software/why-did-you-render`
  - 添加文件 wdyr.js 写入代码

    ```js
    import React from 'react'
    if (process.env.NODE_ENV === 'development') {
    	const whyDidYouRender = require('@welldone-software/why-did-you-render')
    	whyDidYouRender(React, {
    		trackAllPureComponents: true, //  是否监听全部组件
    	})
    }

    //  index.tsx 引入 whdr.js, 必须在第一行
    import './wdyr'

    //  其他 ts 文件, 如何执行单个组件监听呢
    OtherComponentName.whyDidYouRender = true
    ```

## Redux Toolkit 使用

- 安装依赖 `cnpm i -S react-redux @reduxjs/tookit`

## React Query 使用

使用 React Query 缓存 projects 数据

## 问题

- [craco-less 问题](https://github.com/DocSpring/craco-less/issues/86)
