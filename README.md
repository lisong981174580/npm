# npm
npm学习...
## 一、npm是什么？
> 本人账号 allen(lisong),密码肯定不能告诉你了...

官网是这个：https://www.npmjs.com/

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


