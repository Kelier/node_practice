#### 简介
这里有一些vue-loader很酷的特性：
- ES2015 默认支持;
- 允许对 Vue 组件的组成部分使用其它 Webpack loaders，比如对`<style>`使用 SASS 和对 `<template>` 使用 `Jade`；
- .vue 文件中允许自定义节点，然后使用自定义的 loader 处理他们；
- 把 `<style>` 和 `<template>` 中的静态资源当作模块来对待，并使用 Webpack loaders 进行处理；
- 对每个组件模拟出 CSS 作用域；
- 支持开发期组件的热重载。

#### 组件细则
.vue是一个自定义的文件类型，用类HTML的语法来描述一个Vue组件。而每一个vue文件包含三种类型的顶级语言块`<template>`,`<script>`,`<style>`,还允许添加可选的自定义块

```
<template>
<div class="example">{{msg}}</div>
</template>

<script>
export default{
  data(){
    return{
      msg:'Hello world!'
    }
  }
}
</script>

<style>
.example{
  color:red;
}
</style>

<custom1>
This could be e.g. documentation for the component
</custom1>

```

`vue-loader` 会解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 CommonJS 模块，module.exports 出一个 Vue.js 组件对象。

##### 语言块

###### `<template>`

- 默认语言：`html`。
- 每个 .vue 文件最多包含一个 `<template>` 块
- 内容将被提取为字符串，将编译并用作 Vue 组件的 `template` 选项。

###### `<script>`

- 默认语言：js (在检测到 `babel-loader` 或 `buble-loader` 配置时自动支持ES2015).
- 每个 .vue 文件最多包含一个 `<script>` 块
- 该脚本在类 CommonJS 环境中执行（就像通过 Webpack 打包的正常 js 模块），这意味这你可以`require()`` 其它依赖。在 ES2015 支持下，你也可以使用 `import` 和 `export` 语法。
- 脚本必须导出 Vue.js 组件对象。也可以导出由 `Vue.extend()` 创建的扩展对象，但是普通对象是更好的选择。

###### `<style>`

- 默认语言： `css`。
- 一个 .vue 文件可以包含多个 `<style>` 标签。
- 可以有 `scoped` 或者 `module` 属性 (查看 CSS 作用域 和 CSS 模块) 以帮助你将样式封装到当前组件。具有不同封装模式的多个 `<style>` 标签可以在同一个组件中混合使用。
- 默认情况下，将会使用 `style-loader` 提取内容，并通过 `<style>` 标签动态加入文档的 `<head>` 中，也可以配置 Webpack 将所有 styles 提取到单个 CSS 文件中.

<hr>

#### 特性

##### ES2015

当项目中配置了 `babel-loader` 或者 `buble-loader`，`vue-loader` 会使用他们处理所有 .vue 文件中的 `<script>` 部分，允许我们在 Vue 组件中使用 ES2015

给你一个导入其他Vue组件的典型写法：
```
<script>
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

export default{
  components:{
    ComponentA,
    ComponentB
  }
}
</script>
```
我们使用 ES2015 的属性的简洁表示法去定义子组件，{ `ComponentA` } 是 { `ComponentA: ComponentA` } 的简写，Vue 会自动的将 key 转换为`component-a`，所以你可以在 template 中使用 `<component-a>`.

>由于 vue-loader 只处理 .vue 文件，你需要告诉 Webpack 如何使用 babel-loader 或者 buble-loader 处理普通 .js 文件，在 Webpack 中配置 babel-loader 或者 buble-loader。脚手架工具 vue-cli 已经为你做了这些。

##### CSS作用域

当 `<style>` 标签有 `scoped` 属性时，它的 CSS 只作用于当前组件中的元素。
```
<style scoped>
.example{
  color:red;
}
</style>

<template>
<div class="example">hi</div>
</templaye>
```

通过PostCSS实现转换
```
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```
>CSS 作用域不能代替 classes。考虑到浏览器渲染各种 CSS 选择器的方式，当使用 scoped 时，`p { color: red }` 在作用域中会慢很多倍（即当与属性选择器组合时）。如果你使用 classes 或者 ids 代替，比如 `.example { color: red }`，这样几乎没有性能影响。

##### CSS模块

###### 使用
```
<style module>
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>
```

这里为`css-loader`开CSS模块模式，生成的CSS对象将为组件注入一个计算属性，名为`$style`，你可以在模块中使用动态class绑定
```
<template>
<p :class="$style.red">
This is should be red
</p>
//同样也适用于object.array语法
<p :class="{[$style.red]:isRed}">
Am I red?
</p>
</template>
```

###### 自定义注入名称

在 .vue 中你可以定义不止一个 `<style>`，为了避免被覆盖，你可以通过设置 module 属性来为它们定义注入后计算属性的名称。

##### PostCSS
由`vue-loader` 处理的 CSS 输出，都是通过 PostCSS 进行作用域重写，你还可以为 PostCSS 添加自定义插件，例如 **autoprefixer** 或者 **CSSNext**。


###### 配置文件
使用配置文件允许你在由 postcss-loader 处理的普通CSS文件和 *.vue 文件中的 CSS 之间共享相同的配置，这是推荐的做法。

###### 内联选项
你可以使用 `vue-loader` 的 `postcss` 选项来为 .vue 文件指定配置。
```
//webpack.config.js
module.exports={
  //other options...
  module:{
    //module.rules is the same as module.loaders in 1.x
    rules:[
    {
      test:/\.vue$/,
      loader:'vue-loader',
      //vue-loader options goes here
      options:{
        postcss:[require('postcss-cssnext')()]
      }
    }
    ]
  }
}
```

##### 热重载

"热重载"不是当你修改文件的时候简单重新加载页面。启用热重载后，当你修改 .vue 文件时，所有该组件的实例会被替换，并且不需要刷新页面。它甚至保持应用程序和被替换组件的当前状态！

<hr>

#### 配置

##### 预处理器

 vue-loader 允许你使用其它 Webpack loaders 处理 Vue 组件的某一部分。它会根据 lang 属性自动推断出要使用的 loaders。

 比如安装sass
```
 npm install sass-loader node-sass --save-dev
<style lang="sass">
  /* write sass here */
</style>
```

 ###### sass-loader可能给出警告

 因为，与名称相反的sass-loader 默认解析 SCSS 语法。如果你想要使用 SASS 语法，你需要配置 vue-loader 的选项：
```
{
  test:/\.vue$/,
  loader:'vue-loader',
  options:{
    loaders:{
      scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
     sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
    }
  }
}
```

>Vue 组件中的所有 JavaScript 默认使用 babel-loader 处理。

##### 资源路径处理

默认情况下，`vue-loader` 使用 `css-loader` 和 Vue 模版编译器自动处理你的样式和模版文件。在编译过程中，所有的资源路径例如 `<img src="...">`, `background: url(...)` 和 `@import` 会作为**模块依赖**。

>例如，url(./image.png) 会被转换为 require('./image.png'),

> 将会编译为：createElement('img', { attrs: { src: require('../image.png') }})

好处有以下两点：
1. file-loader 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。这意味着 **你可以就近管理你的图片文件，可以使用相对路径而不用担心布署时URL问题**。
2. url-loader 允许你有条件将文件转换为内联的 base-64 URL（当文件小于给定的阈值），这会减少小文件的 HTTP 请求。如果文件大于该阈值，会自动的交给 `file-loader` 处理。

##### 提取CSS文件

首先安装相关依赖
>npm install extract-text-webpack-plugin --save-dev

提取的方法
```
//webpack.config.js
var ExtractTextPlugin=require("extract-text-webpack-plugin")

module.exports={
  module:{
    rules:[
    {
      test:/\.vue$/,
      loader:'vue-loader',
      options:{
        extractCSS:true
      }
    }
    ]
  },
  plugins:
  new ExtractTextPlugin(style.css)
}
```

上述内容将自动处理 *.vue 文件内的 `<style>` 提取，并与大多数预处理器一样开箱即用。

注意这只是提取 *.vue 文件 - 但在 JavaScript 中导入的 CSS 仍然需要单独配置。

###### 手动配置
```
//webpack.config.js
//...
options:{
  loaders:{
    css:ExtractTextPlugin.extract({
      use:'css-loader',
      fallback:'vue-style-loader'// <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
      })
  }
}

```

##### 自定义块
在 `.vue` 文件中，你可以自定义语言块。自定义块的内容将由 `vue-loader` 的 `options` 中的 `loader` 对象中指定的 loader 处理，然后被组件模块依赖

<hr>

#### 工作流程

##### 生产环境构建

生产环境的打包需要做两件事：
1. 压缩代码
2. 去除警告

下面是配置示例
```
// webpack.config.js
module.exports = {
  // ... other options
  plugins: [
    // short-circuits all Vue.js warning code
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // optimize module ids by occurrence count
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}
```

如果不使用这些配置，你可以换种思路

1. 使用环境变量动态构建；
2. 或者，使用两个分开的 Webpack 配置文件，一个用于开发环境，一个用于生产环境。把可能共用的配置放到第三个文件中

##### 代码检验

我们如何在.vue中检查你的代码呢，ESLint，a good job!

A.eslint-plugin-html

确保你有这样的配置
```
"plugins": [
  "html"
]
```

命令行的使用
>eslint --ext js,vue MyComponent.vue

B.eslint-loader

>npm install eslint eslint-loader --save-dev

```
module.exports={
  module:{
    loaders:[{
      test:/\.vue$/,
      loader:'vue!eslint'
      }]
  }
}
```

##### 测试

推荐设置 **Karma** 和 **karma-webpack**

>npm install\
  karma karma-webpack\
  karma-jasmine jasmine-core\
  karma-phantomjs-launcher phantomjs\
  --save-dev

```
// 我们只需要使用完全相同的 webpack 配置即可
// 但是，请记得删除原来的 entry，因为我们在测试期间不需要它
var webpackConfig = require('./webpack.config.js')
delete webpackConfig.entry

// karma.conf.js
module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    // 这是所有测试的入口文件。
    files: ['test/index.js'],
    // 把入口文件传给 webpack 以进行打包。
    preprocessors: {
      'test/index.js': ['webpack']
    },
    // 使用 webpack 配置
    webpack: webpackConfig,
    // avoid walls of useless text
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true
  })
}
```

`test/index.js` 文件如下：

```
// test/index.js
// require all test files using special Webpack feature
// https://webpack.github.io/docs/context.html#require-context
var testsContext = require.context('.', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
```

测试文件如下：
```
// test/component-a.spec.js
var Vue = require('vue')
var ComponentA = require('../../src/components/a.vue')

describe('a.vue', function () {

  // JavaScript 选项断言
  it('should have correct message', function () {
    expect(ComponentA.data().msg).toBe('Hello from Component A!')
  })

  // 组件实际渲染的渲染结果断言
  it('should render correct message', function () {
    var vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ComponentA
      }
    }).$mount()
    expect(vm.$el.querySelector('h2.red').textContent).toBe('Hello from Component A!')
  })
})
```

package.json:
```
...
"scripts": {
  ...
  "test": "karma start karma.conf.js"
}
...
```

运行:
>npm test

这一个完整的测试用例博主目前还在学习中，先直接傻傻的搬运过来熟悉下，望大家海涵.

-End<br>
From Vuejs.org
