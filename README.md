# zhwl-inbar-web

> 臻合网吧管理前端

## 开发工具
* [NodeJS](`https://nodejs.org/en/`), `v8.11.3`及以上版本
* [WebStorm](http://www.jetbrains.com/webstorm/), `v2017.2`以上版本

## 开发步骤

``` bash
# 淘宝NPM镜像（加快node_modules下载速度）
npm config -g set registry https://registry.npm.taobao.org

# 安装项目依赖包
npm install

# 启动开发时热部署服务器 => localhost:9000
npm run dev

# 生产环境构建
npm run build

# 生产化构建并查看模块分析报告
npm run build --report

# 单元测试命令
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 项目框架
#### 目录结构
|  目录 | 说明 |
|--------|-------|
| `src/views` | 业务功能页面 |
| `src/core` |  核心工具 |
| `src/*-plugin.js` |  Vue插件 |

#### Vue插件说明
##### 1. dom
> `dom属性` 仅可在`mounted`或其后的生命周期中才能使用
```javascript
export default {
  dom: {
    /* 属性名(this.demoButton)  |    组件内dom元素筛选器  */  
    demoButton:                  '.show-demo'
  },
  mounted() {
    this.demoButton.click(this.someMethod)
  }
}
```

##### 2. children
> `children属性` 仅可在`mounted`或其后的生命周期中才能使用
```html
<template>
<div>
  <nav>
    <input name="search">
    <button @click="showLogin">Login</button>
  </nav>
  
  <!-- some other tags ... -->
  
  <modal-dialog key="loginModalDialog" title="登录">
    <!-- some other tags ... -->
  </modal-dialog>
</div>
</template>

<script>
export default {
  children: {
    /* 属性名(this.loginDialog)  |    子组件的key  */  
    loginDialog:                  'loginModalDialog'
  },
  methods: {
    showLogin() {
        this.loginDialog.show()
      }
  }
}
</script>
```

##### 3. forms

```javascript
export default {
  forms: {
    /* 属性名(this.loginDialog)  |    组件内dom元素筛选器  */  
    loginForm:                  'form.login'
  },
  methods: {
    someMethod() {
        this.loginForm.validate()
      }
  }
}
```

## 参考资料
- [ECMAScript 6 入门](http://es6.ruanyifeng.com/)
- [Vue Webpack 构建配置](http://vuejs-templates.github.io/webpack/)
- [Vue CLI命令行工具](https://cli.vuejs.org/guide/)
- [Vue Router](https://router.vuejs.org/zh/)
- [Vue Loader](http://vuejs.github.io/vue-loader)
- [ESLint 语法检查](https://eslint.org/)
- [Babel ES6编译器](http://babeljs.io/)
- [PubSub](https://www.npmjs.com/package/pubsub-js)
- [Lodash](https://www.lodashjs.com/)

