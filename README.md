# zhwl-inbar-web

> 臻合网吧管理前端

## 开发工具
* [NodeJS](`https://nodejs.org/en/`), `v8.11.3`及以上版本
* [WebStorm](http://www.jetbrains.com/webstorm/), `v2017.2`以上版本

## 开发步骤

``` bash
# 淘宝NPM镜像（加快node_modules下载速度）
npm config -g set registry https://registry.npm.taobao.org
npm config -g set chromedriver_cdnurl http://cdn.npm.taobao.org/dist/chromedriver


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
#### Base
- [ECMAScript 6 入门](http://es6.ruanyifeng.com/)
- [Vue Webpack 构建配置](http://vuejs-templates.github.io/webpack/)
- [Vue CLI命令行工具](https://cli.vuejs.org/guide/)
- [Vue Router](https://router.vuejs.org/zh/)
- [Vue Loader](http://vuejs.github.io/vue-loader)
- [ESLint 语法检查](https://eslint.org/)
- [Babel ES6编译器](http://babeljs.io/)
- [Admui](./README_admui.md)

#### JS Lib
- [PubSub](https://www.npmjs.com/package/pubsub-js)
- [Lodash](https://www.lodashjs.com/)

#### CSS Preprocessor
- [Sass](https://www.sass.hk/guide/)<sup>推荐使用</sup>
- [Less](http://lesscss.cn/)
- [Sass vs. Less](https://www.cnblogs.com/roashley/p/7731865.html)
- [Stylus](https://www.zhangxinxu.com/jq/stylus/)<sup>项目中未使用</sup>

#### UI Lib
- [Bootstrap 3](https://v3.bootcss.com/)
- [Toastr](https://github.com/CodeSeven/toastr)
- [Layer](http://www.layui.com/doc/modules/layer.html)
- [ArtTemplate](https://aui.github.io/art-template/)<sup style="color:red;">计划移除</sup>
- [Animsition](http://git.blivesta.com/animsition/)<sup>动画框架</sup>
- [Modernizr](https://modernizr.com/docs)<sup>H5&CSS3特性检测</sup>
- [Breakpoints](https://github.com/thecreation/breakpoints-js)<sup>布局响应适配工具</sup>


