webpack 是一个现代的 JavaScript 应用程序的模块打包器(module bundler)。它有着难以置信的配置，然而，我们认为你必须在开始前先了解四个核心概念！

### 入口起点(Entry Points)

webpack 将创建所有应用程序的依赖关系图表(dependency graph)。图表的起点被称之为入口起点(entry point)。入口起点告诉 webpack 从哪里开始，并遵循着依赖关系图表知道要打包什么。可以将您应用程序的入口起点认为是根上下文(contextual root)或 app 第一个启动文件。

A simple example

```
module.export={
  entry:'./path/to/my/entry/file.js'
};
```
### 出口(Output)

将所有的资源(assets)归拢在一起后，我们还需要告诉 webpack 在哪里打包我们的应用程序。webpack 的 output 属性描述了如何处理归拢在一起的代码(bundled code)。

```
var path=require('path');

module.exports={
  entry:'./path/to/my/entry/file.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'my-first-webpack-bundle.js'
  }
};
```

### 加载器(Loaders)

webpack 的目标是，让 webpack 聚焦于项目中的所有资源(asset)，而浏览器不需要关注考虑这些（这并不意味着资源(asset)都必须打包在一起）。webpack 把每个文件(.css, .html, .scss, .jpg, etc.) 都作为模块处理。而且 webpack 只理解 JavaScript。

webpack loader 会将这些文件转换为模块，而转换后的文件会被添加到依赖图表中。

在更高层面，webpack 的配置有两个目标。

1. 识别出(identify)应该被对应的 loader 进行转换(transform)的那些文件
2. 由于进行过文件转换，所以能够将被转换的文件添加到依赖图表（并且最终添加到 bundle 中）(use 属性)

```
var path=require('path');

const config={
  entry:'./path.to/my/entry/file.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'my-first-webpack-bundle.js'
  },
  module:{
    rules:[
    {test:/\.(js|jsx)$/,use:'babel-loader'}
    ]
  }
};

module.exports=config;
```
以上配置中，我们对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：test 和 use。这可以告诉 webpack compiler 如下：

>“嘿，webpack compiler，当你碰到「在 require()/import 语句中被解析为 '.js' 或 '.jsx' 的路径」时，在你把它们添加并打包之前，要先使用 babel-loader 去转换”。

没错就是这样。

作为Webpack的一大利器，Loader的特性有下列几条：

- loader 支持链式传递。能够对资源使用流水线(pipeline)。loader 链式地按照先后顺序进行编译。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
- loader 可以是同步或异步函数。
- loader 运行在 Node.js 中，并且能够执行任何可能的操作。
- loader 接收查询参数。用于 loader 间传递配置。
- loader 也能够使用 options 对象进行配置。
- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

loader 通过（loader）预处理函数，为 JavaScript 生态系统提供了更多有力功能。用户现在可以更加灵活的引入细粒度逻辑，例如压缩(compression)、打包(package)、语言翻译(language translation) and so much...

### 插件(Plugins)

由于 loader 仅在每个文件的基础上执行转换，而 插件(plugins) 最常用于（但不限于）在打包模块的“compilation”和“chunk”生命周期执行操作和自定义功能,这极强的增加了其功能的可定制性，确实值得称道。

```
const HtmlWebpackPlugin=require('html-webpack-plugin');//installed via npm
const webpack=require('webpack');//to access built-in Plugins
const path=require('path');

const config={
  entry:'./path/to/my/entry.file.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'my-first-webpack-bundle'
  },
  module:{
    rules:[
    {test:/\.(js|jsx)$/,use:'babbabel-loader'}
    ]
  },
  plugins:[
  new webpack.optimize.UglifyJsPlugin(),
  new HtmlWebpackPlugin({template:'./src/index.html'})
  ]
};

module.exports=config;


```

webpack 插件是一个具有`apply`属性的 JavaScript 对象。 apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个 compilation 生命周期访问。


### 配置(Configurations)

上面已经提到过webpack最简单的配置方式，现在说一下多个target的情况

```
var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var baseConfig = {
  target: 'async-node',
  entry: {
    entry: './entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'inline',
      filename: 'inline.js',
      minChunks: Infinity
    }),
    new webpack.optimize.AggressiveSplittingPlugin({
        minSize: 5000,
        maxSize: 10000
    }),
  ]
};

let targets = ['web', 'webworker', 'node', 'async-node', 'node-webkit', 'electron-main'].map((target) => {
  let base = webpackMerge(baseConfig, {
    target: target,
    output: {
      path: path.resolve(__dirname, 'dist/' + target),
      filename: '[name].' + target + '.js'
    }
  });
  return base;
});

module.exports = targets;
```

### 模块(Modules)

webpack 通过 loader 可以支持各种语言和预处理器编写模块。loader 描述了 webpack 如何处理 非 JavaScript(non-JavaScript) 模块，并且在bundle中引入这些依赖。

### 模块解析(Module Resolution)

解析器是一个通过绝对路径来帮助定位模块的库(library)。 一个模块可以作为另一个模块的依赖模块，然后被后者引用，如下：

```
import foo from 'path/to/module'
//or
require('path/to/module')
```

#### 解析规则
使用 `enhanced-resolve`，webpack 能够解析三种文件路径：

##### 绝对路径
```
import "/home/me/file";

import "C:\\Users\\me\\file";
```

##### 相对路径
```
import "../src/file1";
import "./file2";
```

在这种情况下，出现 import 或 require 的资源文件的目录被认为是上下文目录(context directory)（当前处理文件的目录）。在 `import/require` 中给定的相对路径被追加到此上下文路径(context path)，以生成模块的绝对路径(absolute path)。

##### 模块路径
```
import "module";
import "module/lib/file";
```

模块将在 `resolve.modules` 中指定的所有目录内搜索。 你可以替换初始模块路径，此替换路径通过使用 `resolve.alias` 配置选项来创建一个别名。

一旦根据上述规则解析路径后，解析器(resolver)将检查路径是否指向文件或目录。如果路径指向一个文件：

- 如果路径具有文件扩展名，则直接将文件打包。
- 否则，将使用 [`resolve.extensions`] 选项作为文件扩展名来解析，此选项告诉解析器在解析中能够接受哪些扩展名（例如 .js, .jsx）。

如果路径指向一个文件夹，则采取以下步骤找到具有正确扩展名的正确文件。

- 如果文件夹中包含 package.json 文件，则按照顺序查找 `resolve.mainFields` 配置选项中指定的字段。并且 package.json 中的第一个这样的字段确定文件路径。

>`resolveLoader` 配置选项可以用来为 Loader 提供独立的解析规则。

### 依赖图表(Dependency Graph)

任何时候一个文件依赖于另一个文件，webpack 把这个文件当作依赖处理。这使得 webpack 可以接收非代码资源(non-code asset)（例如图像或 web 字体），并且也能把它们作为依赖提供给你的应用。

### 构建目标

#### 用法
要设置 target 属性，只需要在你的 webpack 配置中设置 target 的值。

```
module.exports = {
  target: 'node'
};
```
在上面例子中，使用 `node` webpack 会编译为用于「类 Node.js」环境（使用 Node.js 的 `require` ，而不是使用任意内置模块（如 `fs` 或 `path`）来加载 chunk）。

##### 多个Target
尽管 webpack 不支持向 `target` 传入多个字符串，你可以通过打包两份分离的配置来创建同构的库：

```
var path = require('path');
var serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js'
  }
  //…
};

var clientConfig = {
  target: 'web', // <=== 默认是 'web'，可省略
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js'
  }
  //…
};

module.exports = [ serverConfig, clientConfig ];
```

上面的例子将在你的 dist 文件夹下创建 lib.js 和 lib.node.js 文件。

### 模式热替换(Hot Module Replacement)

模块热替换功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载页面。这使得你可以在独立模块变更后，无需刷新整个页面，就可以更新这些模块，极大地加速了开发时间。

-End<br>
imported by webpack[中文文档]
