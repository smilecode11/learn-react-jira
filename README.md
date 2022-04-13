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
        	"husky": {
        		"hooks": {
        			"pre-commit": "lint-staged"
        		}
        	},
        	"lint-staged": {
        		"*.{js,css,md,ts,tsx}": "prettier --write"
        	}
        }
        //  git commit 时即触发 pre-commit 钩子, 运行 lint-staged 命令, 对 js, css, md, ts, tsx 文件执行格式化
        ```
  - 添加 commitlint, 实现 commit 约束
    - 安装 `cnpm install --save-dev @commitlint/config-conventional @commitlint/cli`
    - 执行命令 `echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js`
    - 将 commitlint 添加到 husky 中 `cnpm husky add .husky/commit-msg "cnpm commitlint --edit $1"`
    - 执行命令 `npx husky add .husky/commit-msg "yarn commitlint --edit $1"`
    - .husky 下添加 commit-msg, 并修改 package.json 中添加 commit-msg
      ```json
      {
          "husky": {
              "hooks": {
                  "commit-msg": "commit -E HUSKY_GIT_PARAMS"
              }
          },
      }
        ``


      ```
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
