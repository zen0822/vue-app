# vue 单页应用和多页应用的模板

## mpa 多页应用模板

### 构建开发环境

```sh
node bin/dev --app mpa

# 或者运行 npm 脚本
# npm run devMpa
```

### 构建测试环境

#### 单元测试

```sh
node bin/test --app mpa

# 或者运行 npm 脚本
# npm run testMpa
```

### 打包产品环境的代码

```sh
node bin/prod --app mpa

# 或者运行 npm 脚本
# npm run prodMpa
```

***

## spa 单页应用模板

### 构建开发环境

```sh
node bin/dev --app spa

# 或者运行 npm 脚本
# npm run devMpa
```

### 构建测试环境

#### 单元测试

```sh
node bin/test --app spa

# 或者运行 npm 脚本
# npm run testSpa
```

### 打包产品环境的代码

```sh
node bin/prod --app spa

# 或者运行 npm 脚本
# npm run prodMpa
```

# 应用设置参数说明

```
appType: 应用名字
assetRoot: 打包生成的文件存放的位置
assetPublicPath: 打包生成的文件的公共路径
assetSubDirectory: 静态文件存放位置
apiUrl: api 的前缀
hotPort: dev server 热加载端口号
mockPort: 模拟数据的服务器端口号
gzip: 开启gzip
spaPrerender: 单页应用开启页面预渲染
spaPrerenderRoute: 单页应用开启页面预渲染的路由（ex: ["/", "/home"]），默认首页
spaCodeSplit: 单页应用开启路由页面的代码分割
```