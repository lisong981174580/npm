# npm
npm学习...
## 一、npm是什么？
> 本人账号 allen(lisong),密码肯定不能告诉你了...

官网是这个：https://www.npmjs.com/
淘宝镜像： http://npm.taobao.org/

官网介绍：npm is the package manager for javascript，

npm是js的包管理器，更多的用于nodejs端。

基本上每种语言都有自己的包管理器，nodejs是npm以及yarn；

java是ant，maven，gradle；

python有很多包管理器；

ruby是rubygem。

如果你熟悉以上某种包管理器，那么npm也是大同小异的。


---------------------

## 二、npm常用命令

基于package.json安装项目依赖包


| 类型  | 命令 |  
| --- | --- | 
| 1 | npm install    |  

安装一个npm包(如：express)

| 类型  | 命令 |  
| --- | --- | 
| 安装到开发环境 |npm install express --save-dev  |  
| 安装到生产环境 |npm install express --save |  

卸载一个npm包(如：express)

| 类型  | 命令 |  
| --- | --- | 
| 1 |npm uninstall express  |  

列出当前使用到的npm包

| 类型  | 命令 |  
| --- | --- | 
| 当前目录下 | npm list  |  
| 全局 | npm list -g --depth 0  |  

以上命令添加-g后为全局使用，

熟悉以上命令基本可以简单使用npm了。

---------------------

## 三、npm init

熟悉常用命令后，开始各种npm install，或者npm install -g，

某天想自己发布一个npm包，发现有点茫然，那就从头开始。

第一步是npm init，

发现需要你输入一些信息，依次输入，

package name，包名是什么，也就是最终其他人npm install xxx，这个xxx就是包名；

version，版本号；

description：描述；

entry point：入口js；

test command：测试命令，暂时空开；

gir repository：git库地址，暂时空开；

keywords：关键字；

author：作者，先写你的名字；

license：协议；

最后询问你是否生成package.json，输入y回车。

## 四、写一个简单的例子

在这个文件夹下，新建lib，test文件夹，

新建index.js文件，

| 1 | 	// nothing  |  

新建lib/qiao.test.demo2.js文件，

```
/**
* say hello
*/
exports.sayHello = function(){
    console.log('hello world!');
};

```

新建test/test.js文件，
```
var qiaoTestDemo2 = require('../lib/qiao.test.demo2.js');
 
function test(){
    qiaoTestDemo2.sayHello();
}
 
test();

```

测试一下，执行node test/test.js，

## 五、开始第一次发布

创建帐号

首先需要注册一个帐号，输入npm adduser，然后输入姓名，密码，邮箱，注意，密码不能过于简单

激活邮箱

npm adduser成功后，npm会给你的邮箱发一封邮件，需要激活，如果不激活就发布npm包会报错

也可以登录官网手动创建，记住创建后每次发包时候要登录

```
npm login

```
首次发布  

npm publish

验证1

在npm官网搜索test-lisong，可以搜索到

验证2

npm install test-lisong可以安装

## 六、实现一个小功能

如上，已经可以发布一个npm包了，但是发布的包基本没啥用，

接下来实战一个小功能，基于archiver封装一个压缩zip的功能，

首先快速的看一遍archiver的文档：https://www.npmjs.com/package/archiver

提炼出核心代码到lib/qiao.test.demo2.js中，如下

```
var fs             = require('fs');
var archiver     = require('archiver');
 
/**
* zip folder
* destZip, d:/1.zip
* sourceFolder, d:/test1 
* cb, callback
*/
exports.zipFolder = function(destZip, sourceFolder, cb){
    // init
    var output = fs.createWriteStream(destZip);
    var archive = archiver('zip', {
        zlib: { level: 9 }
    });
     
    // on
    output.on('close', function() {
        cb(null, '压缩完成！');
    });
    archive.on('error', function(err) {
        cb(err);
    });
 
    // zip
    archive.pipe(output);
    archive.directory(sourceFolder, false);
    archive.finalize();
};

```
test/test.js修改为：
```
var qiaoTestDemo2 = require('../lib/qiao.test.demo2.js');
 
function test(){
    var destZip            = 'd:/1.zip';
    var sourceFolder     = 'd:/test1';
 
    qiaoTestDemo2.zipFolder(destZip, sourceFolder, function(err, msg){
        if(err) throw err;
 
        console.log(msg);
    });
}
 
test();

```

执行node test/test.js发现报错

原来是没有引入archiver，这个时候执行npm install archiver，

然后再次执行node test/test.js，看到压缩完成，

## 七、再次发布

压缩一个文件夹的功能，基于archiver包已经实现，现在可以再次发包，

需要将package.json中的version修改为0.0.2，如下

```
{
  "name": "test-lisong",
  "version": "1.0.2",
  "description": "this is test ",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "test-lisong"
  ],
  "author": "allen(lisong)",
  "license": "ISC",
  "dependencies": {
    "archiver": "^3.0.0"
  }
}

```
同时你会发现，dependencies中添加对archiver的依赖

再次执行npm publish，发布test-lisong1.0.2版本成功

## 八、使用自己的包

npm包已经发布完毕，现在要测试如果是其他人安装你的包后是否可以使用，

新建一个文件夹，写一个test.js如下
```
var qiaoTestDemo2 = require('test-lisong');
 
function test(){
    var destZip            = 'd:/1.zip';
    var sourceFolder     = 'd:/test1';
 
    qiaoTestDemo2.zipFolder(destZip, sourceFolder, function(err, msg){
        if(err) throw err;
 
        console.log(msg);
    });
}
 
test();

```
注意，和之前test/test.js的不同是require不同，这次是直接引用，

然后执行node test.js，发现报错，是没有引用test-lisong包，

执行npm install test-lisong，安装包，再次执行node test.js，

发现还是报错

zipFolder未定义，但是lib/qiao.test.demo2.js中是有定义的，问题出在哪里，

出在index.js中，因为index.js是你这个包的入口，而目前的index.js是空的，需要修改为：

```
module.exports = require('./lib/qiao.test.demo2');

```

再次发布为0.0.3版本，再次安装，再次执行node test.js，成功，

## 九、小结一下

目前可以做到的是：

1.注册npm

2.发布npm包

3.实现压缩文件夹功能

4.将该包对外

## 十、readme.md

在npm官网上搜索qiao.test.demo2，点进去，发现页面是空白的，

不像其他npm包一样，有详细的介绍，

因为包下没有readme.md文件，添加一个readme.md，如下，markdown的语法可以自行百度，

```
# qiao.test.demo2
---
zip folder by archiver
 
# install
---
npm install qiao.test.demo2
 
# zip folder
---
    var qiaoTestDemo2 = require('../lib/qiao.test.demo2.js');
 
    function test(){
        var destZip            = 'd:/1.zip';
        var sourceFolder     = 'd:/test1';
 
        qiaoTestDemo2.zipFolder(destZip, sourceFolder, function(err, msg){
            if(err) throw err;
 
            console.log(msg);
        });
    }
 
    test();
```
将package.json中的version修改为0.0.4，再次npm publish，刷新npm页面，如下

## 十一、丰富package.json

接下来还可以丰富下package.json文件，最简单的方法是看文档，或者下载一个成熟的npm包进行模仿，

比如npm install express后看express的package.json是怎么写的，

丰富后如下，主要丰富了author，homepage，repository，

```
{
  "name": "test-lisong",
  "version": "0.0.4",
  "description": "qiao test demo 2",
  "main": "index.js",
  "scripts": {
  },
  "keywords": [
    "qiao",
    "test",
    "demo",
    "2"
  ],
  "author": {
    "name": "qiaowenbin",
    "email": "npm@insistime.com",
    "url": "http://insistime.com"
  },
  "homepage": "http://insistime.com/",
  "license": "MIT",
  "dependencies": {
    "archiver": "^2.1.0"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ your github url"
  }
}

```
一般npm包都会开源到github上一份，package.json中的repository会指向github，用户可以直接查看源码

## 十二、.npmignore
需要注意的一点是npm发布后不能撤回，也就是千万不要把一些重要的配置文件发布上去，

这个时候需要用的npmignore文件，类似gitignore，

配置好后就可以忽略一些不想上传的文件

## 十三、npm脚本

细心的同学会发现，最开始npm init的时候有一项是test commad，之前的空的，

现在需要稍作修改，在package.json中修改为：

```
"scripts": {
      "test" : "node test/test.js"
  },
  
```

之后就可以执行npm run test，如下

你也可以添加其他脚本，在package.json中的script下添加，key-value，value为要执行的命令，

然后就可以使用npm run key的方式执行对应的value命令

## 十四、参考
> http://uikoo9.com/book/chapterDetail/124

> http://uikoo9.com/book/chapterDetail/123

## 十五、总结

1.npm注册

2.npm发包

3.实现压缩文件夹功能

4.将npm包对外

5.添加readme.md

6.丰富package.json

7.添加npmignore

8.使用npm脚本


