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
  - 修改 package.json, 添加启动命令 `"json-server": "json-server __json_server_mock__/db.json --watch"`
  - 执行命令 `npm run json-server` 开始使用
- REST API
  ```
  GET     /tickets      //  列表
  GET     /tickets/12   //  详情
  POST    /tickets      //  增加
  PUT     /tickets/12   //  替换
  PATCH   /tickets/1    //  修改
  DELETE  /tickets/12   //  删除
  ```
