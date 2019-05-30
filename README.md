

# Mac MongoDB安装

[TOC]

## 一. 下载

> [mongodb下载地址](https://www.mongodb.com/download-center/community)
>
> 解压`mongodb-osx-x86_64-4.0.9`，重名为`mongodb`存放到某个目录下；例：Desktop/dev/mongodb



## 二.配置

>  在mongodb根目录下分别创建  `data/db`, `etc/mongod.conf` ,`log/mongod.log	`

创建文件：`touch mongod.conf` `touch log/mongod.log`

- mongod.conf文件

  ```json
  #mongodb config file
  dbpath=/Users/hujiangjun/Desktop/dev/mongodb/data/db/
  logpath=/Users/hujiangjun/Desktop/dev/mongodb/mongod.log
  logappend = true
  port = 27017
  fork = true
  auth = true
  ```



## 三.修改系统环境变量PATH

- 命令行进入：`cd Desktop/dev/mongodb/bin`

- 执行：`echo 'export PATH=/Users/hujiangjun/Desktop/dev/mongodb/bin:$PATH'>>~/.bash_profile `

- 最后执行：`source .bash_profile`

- 查看环境变量是否添加成功：`echo $PATH` 

- 为数据库日志文件添加操作权限（新建立的data/db 通过查看是否与读写权限，如果没有的话需要添加读写权限）

  ```sh
  sudo chown -R  hujiangjun /data/db
  ```

- 如何检测安装成功了呢：在控制台输入: `which mongod`  会出现一个路径就代表安装成功了

- 启动mongodb: `Desktop/dev/mongodb/bin`

  ```sh
  ./mongod
  ```

- 浏览器打开：http://127.0.0.1:27017



## 四.踩坑

启动服务报错：

> 解决启动错误：https://blog.csdn.net/u013939918/article/details/78200946
>
> 终端命令执行：`./mongod --dbpath ../data/`



## 五.可视化工具

> [adminMongo](https://github.com/mrvautin/adminMongo)
>
> 1.`git clone https://github.com/mrvautin/adminMongo.git && cd adminMongo`
>
> 2.`npm install`
>
> 3.`npm start`


