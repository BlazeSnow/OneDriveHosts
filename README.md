# OneDriveHosts

## 程序目的

通过指定OneDrive的网站的hosts，实现在封锁OneDrive的ip地址的区域使用OneDrive

## 程序来源

![ban](/image/ban.png)

如上图所示，部分地区封锁了OneDrive的网站的ip，导致OneDrive无法正常使用，需要通过指定ip的方法使用OneDrive的其他ip

测试网址：https://www.itdog.cn/ping/

## 被封锁网址及ip

- api.onedrive.com
- chi01pap001.storage.live.com
- d.docs.live.net
- 13.107.42.12

## 程序实现

### 直接修改hosts

在hosts文件内添加此文件内容：[点击跳转](/hosts)

### SwitchHosts

SwitchHosts页面：https://github.com/oldj/SwitchHosts

若使用SwitchHosts工具：

- GitHub：
```txt
https://raw.githubusercontent.com/BlazeSnow/OneDriveHosts/main/hosts
```
- Gitee：
```txt
https://gitee.com/blazesnow/OneDriveHosts/raw/main/hosts
```

## 程序成果

![effect](/image/effect.png)