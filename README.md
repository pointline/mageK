# mageK

![](./build/static/image/logo.png)

[![node](https://img.shields.io/badge/npm-v6.10.2-blue.svg)]() [![npm](https://img.shields.io/npm/l/express.svg)]()

本插件为了提高Magento2前端主题开发,对Magento2自动化工具做了扩展,基于gulp开发,集成JS编译,Less,
phtml检查,图片压缩等等不必要重复工作,缩短前端开发时间,工程化开发.

+ [支持多area和多theme](#moreAreaAndTheme)
+ [快速生成主题结构](#gulpInit)
+ [支持强大的ES6](#Compile)
+ [编译压缩JS,Less,Image](#Compile)
+ [使用流行的JS语法规范 JavaScript Standard Style](https://standardjs.com/)
+ 友好与magento的Grunt结合使用

## [安装nodejs环境](https://github.com/creationix/nvm)

## 安装
在你的Magento的dev目录下clone本项目

```bash
cd <Magento root dir>/dev
git clone git@github.com:pointline/mageK.git
```

## 安装gulp-cli
全局安装gulp-cli用以驱动gulp.babel.js文件

```javascript
npm i -g gulp-cli
```

如果是国内网速可能会安装过慢或失败,建议添加淘宝镜像[`cnpm`](https://npm.taobao.org/)进行安装

## 安装模块依赖

```bash
cd mageK
npm install
```

## 命令及参数
## 命令

<a href="moreAreaAndTheme"></a>
### 初始化主题
配置mageK/build/configs/themes.js,本插件支持多area和多theme,这个地方可以配置多个

```javascript
point: { //主题标识
  name: 'Point name', // 主题名
  area: 'frontend', // 主题区域 可选 adminhtml | frontend
  src: 'Pointline/point' // VendorName/theme
}
```

<a href="#gulpInit"></a>
### gulp init
在mageK项目下执行

```javascript
gulp init
```

😄😄 会看到在mageK下会新生成theme目录,不用担心,以后就在mageK目录下编辑管理主题,
同步到magento的默认主题目录

生成的主题目录中自动创建了magento的常用模块目录以及更多的文件和文件夹

<a href="Compile"></a>
### gulp default

```javascript
gulp
// 可选参数
gulp --watch
gulp --theme + 主题标识
gulp --production
// 以上参数可一起使用
```

这里可以省略default,默认执行default,会自动编译主题下面的所有文件并同步到magento主题目录,这个命令会用到很多

现在就可以到后台去配置 Content > Design > Themes 应用主题,减少了很多重复的操作,加上后台配置最多2分钟便可配置使用上主题

> 缺省`--theme`会生成所有主题到magento主题目录

### gulp clean
清除magento默认主题目录下的文件,并不会清除magek下面的主题文件

```javascript
gulp clean
// 可选参数
gulp clean --theme + 主题标识
```

> 缺省`--theme`会清除所有在magento主题目录的文件

### gulp help
查看命令可选参数,根据可选参数传入不同的值

```javascript
gulp help
```

![gulp help](./build/static/image/gulp_help.png)

## 参数
### --watch或--w
--watch可以简写为--w

--watch会监听对主题的add,chage,del操作,一旦监听到以上操作便会同步到magento主题目录
并且能实时的检查js,css错误,压缩图片等

```javascript
gulp --watch
```

### --theme或--t
--theme可以简写为--t

--theme由于本扩展支持多area和多theme,为了性能的考虑可以单独指定`--theme`,对某个主题执行上面的操作

```javascript
gulp --theme + 主题标识
```

通过`gulp help`可以查看到`--theme`的可选参数,这里的可选参数会根据配置的theme.js变化

> 缺省`--theme`将会对所有主题进行操作

### --production或--prod
--production可以简写为--prod

这个参数一般等到上线时会使用,会对js,css,image等资源进行压缩,看到js,css,image压缩比例

```javascript
gulp --prod
```

> 以上参数一起使用时,参数不分先后顺序

## 实例应用:

```javascript
// 编译所有主题下面的所有资源文件
gulp
// 只需编译point主题下的所有资源文件
gulp --t point
// 编译point主题的同时开启watch
gulp --t point --w
// 压缩point主题的js,css,image等资源
gulp --t point --prod
```

# License
[The MIT License (MIT)](./LICENSE)

Copyright (c) 2017 Point Line
