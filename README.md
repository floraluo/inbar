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
| `src/main.js` | 主界面入口 |
| `src/home` | 主界面布局及菜单 |
| `src/views` | 业务功能页面 |
| `src/core` |  核心工具 |
| `src/plugins` |  Vue插件 |
| `src/globals.js` |  全局变量导出。解决一些不支持commonjs标准脚本访问其他模块的问题 |
| `static/vendor` |  第三方插件 |
| `static/admui` |  Admui脚本 |
| `static/themes` |  Admui脚本 |

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

## FAQ
#### 1. Sass
若运行`npm run dev` 、 `npm run build`等命令时出现下列异常：

```
Module build failed: Error: ENOENT: no such file or directory, scandir '.../node_modules/node-sass/vendor'
    at Object.fs.readdirSync (fs.js:904:18)
    at Object.getInstalledBinaries (.../node_modules/node-sass/lib/extensions.js:129:13)
    at foundBinariesList (.../node_modules/node-sass/lib/errors.js:20:15)
    at foundBinaries (.../node_modules/node-sass/lib/errors.js:15:5)
    at Object.module.exports.missingBinary (.../node_modules/node-sass/lib/errors.js:45:5)
    at module.exports (.../node_modules/node-sass/lib/binding.js:15:30)
    at Object.<anonymous> (.../node_modules/node-sass/lib/index.js:14:35)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Module.require (module.js:596:17)
    at require (internal/module.js:11:18)
    at Object.sassLoader (.../node_modules/sass-loader/lib/loader.js:24:22)
```
> 其中`...`代表此项目的本地路径

请执行下面的命令解决：

```
npm run fix-sass

# 或执行下面的命令强制修复/更新
npm run fix-sass-force
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
- [Sass](https://www.sass.hk/guide/)<sup>项目标准</sup>
- [Less](http://lesscss.cn/)<sup>第三方库可能用到</sup>
- [Sass vs. Less](https://www.cnblogs.com/roashley/p/7731865.html)
- [Stylus](https://www.zhangxinxu.com/jq/stylus/)<sup>第三方库可能用到</sup>

#### UI Lib
- [Bootstrap 3](https://v3.bootcss.com/)
- [Toastr](https://github.com/CodeSeven/toastr)<sup>页面提示</sup>
- [Layer](http://www.layui.com/doc/modules/layer.html)<sup>弹出框</sup>
- [ArtTemplate](https://aui.github.io/art-template/)<sup style="color:red;">计划移除</sup>
- [Animsition](http://git.blivesta.com/animsition/)<sup>动画框架</sup>
- [Modernizr](https://modernizr.com/docs)<sup>H5&CSS3特性检测</sup>
- [Breakpoints](https://github.com/thecreation/breakpoints-js)<sup>布局响应适配工具</sup>


