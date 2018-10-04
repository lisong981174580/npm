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



